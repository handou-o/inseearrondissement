import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import security from "../../config/security";
import * as maps from '@google/maps';
import * as request from 'request';
const googleMapsClient = maps.createClient({
  key: security.google.api_key
});

/**
 * @TODO
 */
@Injectable()
export class ArrondissementService {

  /**
   * Request to google API to get coordonates from text address
   * @TODO We should get the coordonates from the user input using google autocomplete address 
   * @param address 
   */
  private getLongLat(address): Promise<LngLat> {
    return new Promise((resolve, reject) => {
      googleMapsClient.geocode({
        address
      }, function (err, response) {
        if (err) {
          switch(err.json.status) {
            case "ZERO_RESULTS":
                return reject(new BadRequestException('No result'))
            case "INVALID_REQUEST":
                return reject(new BadRequestException('Bad address'));
            default: 
                return reject(new InternalServerErrorException('Sorry please retry later'));
          }
        }
        if (response.json.results.length == 0) { 
          return reject(new NotFoundException('We did not found your address, please retry'));
        }
        if (response.json.results.length > 1) { 
          return reject(new BadRequestException('Please use a more detailled address'));
        }
        resolve(response.json.results[0].geometry.location);
      });
    })
  }

  /**
   * Request to opendatasoft to get arrondissement for the lng/lat params
   * @TODO Use our own MongoDb or any server to store the data and do the search as opendata request are limited. 
   * @param lng 
   * @param lat 
   */
  private getArrondissement(lng: number, lat: number) :  Promise<DataSoftArrondissement>{
    const url = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=contours-geographiques-des-arrondissements-departementaux-2019%40public&geofilter.distance=${lat}%2C${lng}%2C10`
    return new Promise((resolve, reject) => {
      request.get(url, function (err, res, body) {
        try {
          const obj = JSON.parse(body);
          if (err || res.statusCode >= 400 || !obj || !obj.records[0]) {
            throw new Error('')
          }
          return resolve(obj.records[0].fields)
        } catch (e){
          console.error(e);
          reject (new NotFoundException('Sorry we did not found any result, please try again with another address'))
        }
      })
    })
  } 
  
  /**
   * 
   * @param address 
   */
  async getGeocodeFromAddress(address: string): Promise<BusinessUnitInformation> {
    if (!address || typeof address !== 'string' || address.length === 0 || address.length > 150) {
      throw new BadRequestException({
        reason: 'Address is not valid',
        example: {
          address: '48 avenue de Villiers, 75017 Paris'
        }
      })
    }
    let location = await this.getLongLat(address);
    let arrondObject = await this.getArrondissement(location.lng, location.lat);
    return {
      business_unit: arrondObject.insee_dep + '0' + arrondObject.insee_arr,
      arrondissement: '0' + arrondObject.insee_arr
    }
  }

}

export interface DataSoftArrondissement {
  insee_dep: string
  insee_arr: string
}
export interface BusinessUnitInformation {
  business_unit: string
  arrondissement: string
}
export interface LngLat {
  lng: number
  lat: number
}