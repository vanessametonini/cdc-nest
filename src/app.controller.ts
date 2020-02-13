import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return JSON.stringify({
      title: 'Casa do Código',
      version: '1.0.0'
    })
  }
}
