import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService:AppService) {}


  
  //TODO http://locahost:3000/hola
  @Get()
  index(){
    return this.appService.getHello()
  }

}
