import { Test, TestingModule } from '@nestjs/testing';
import { ArrondissementController } from './arrondissement.controller';
import { ArrondissementService } from './maps/arrondissement.service';

describe('Arrondissement Controller', () => {
  let arrondissementController: ArrondissementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArrondissementController],
      providers: [ArrondissementService],
    }).compile();

    arrondissementController = module.get<ArrondissementController>(ArrondissementController);
  });

  it('should return business_unit and arrondissement', () => {
      return expect(arrondissementController.postAddress({ address: '48 avenue de Villiers, 75017 Paris' })).resolves.toEqual({
          business_unit: "7501",
          arrondissement: "01"
        })
  });


  it('should return error', () => {
    return expect(arrondissementController.postAddress({ address: '65 rue existe pas' }))
      .rejects.toMatchObject({
        response: {
          "statusCode": 404,
          "error": "Not Found",
        }
    })
  });
});
