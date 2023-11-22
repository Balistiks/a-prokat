import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";

// Контроллер для принятия запросов по заявкам
@Controller('bipium/order')
export class BipiumOrderController {
  constructor() {}

  @Post('update')
  async update(
    @Req() request: Request,
    @Body() body: any
  ) {
    console.log(body)
  }
}