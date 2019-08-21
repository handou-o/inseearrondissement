import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArrondissementService } from './maps/arrondissement.service';
import { ArrondissementController } from './arrondissement.controller';

@Module({
  imports: [],
  controllers: [AppController, ArrondissementController],
  providers: [AppService, ArrondissementService],
})
export class AppModule {}
