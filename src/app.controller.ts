import { Controller, Get, Post, MethodNotAllowedException, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PostAddressDTO } from './input/post.address';


@Controller()
export class AppController {
  constructor( private readonly appService: AppService) {}

  @Get()
  getIndex(): String{
    return this.appService.getHello();
  }
  
}

