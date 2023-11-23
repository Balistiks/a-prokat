import { InjectQueue } from "@nestjs/bull";
import { Body, Controller, HttpStatus, Logger, Post, Req } from "@nestjs/common";
import { Queue } from "bullmq";

// Контроллер для обработки вебхуков от Бипиум
@Controller('bipium/webhook/order')
export class BipiumWebhookOrderContoller {
  constructor(
    @InjectQueue('storageProcessor') private readonly storageProcessor: Queue,
  ) {}

  // Обработчик вебхука создания заявки /api/v1/bipium/webhook/order/create
  @Post('create')
  async create(
    @Req() request: Request,
    @Body() body: any
  ) {
    await this.storageProcessor.add('addStorage', body.payload)
    return(HttpStatus.OK);
  }

  @Post('update')
  async update(
    @Req() request: Request,
    @Body() body: any
  ) {

  }
}