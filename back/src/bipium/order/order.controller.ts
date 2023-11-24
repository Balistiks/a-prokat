import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, HttpStatus, Post, Req } from "@nestjs/common";
import { Queue, Worker } from "bullmq";
import { Request } from "express";

// Контроллер для обработки запросов по заявкам
@Controller('bipium/order')
export class BipiumOrderController {
  constructor(
    @InjectQueue('orderProcessor') private readonly orderProcessor: Queue,
  ) {}

  // Обработчки запроса для создания заявки /api/bipium/order/create
  @Post('create')
  async create(
    @Req() request: Request,
    @Body() body: any,
  ) {
    await this.orderProcessor.add('addOrder', body);
    return(HttpStatus.OK)
  }
}