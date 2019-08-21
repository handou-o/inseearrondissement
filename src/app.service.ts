import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AppService {

 
  getHello(): string {
    return 'Hello World!';
  }
}
