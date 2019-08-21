import { Controller, MethodNotAllowedException, Body, Post, Get } from '@nestjs/common';
import { ArrondissementService } from './maps/arrondissement.service';
import { PostAddressDTO } from './input/post.address';

@Controller('arrondissement')
export class ArrondissementController {
    constructor( private readonly arrondissementService: ArrondissementService) {}

    @Get()
    getIndex(){
      throw new MethodNotAllowedException('Please use POST') 
    }
    
    @Post()
    async postAddress(@Body() postaddress: PostAddressDTO): Promise<Object> {
      return this.arrondissementService.getGeocodeFromAddress(postaddress.address);
    }
  
}
