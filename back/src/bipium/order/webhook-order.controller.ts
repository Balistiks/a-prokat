import { InjectQueue } from "@nestjs/bullmq";
import { Body, Controller, Post, Req } from "@nestjs/common";
import { Queue } from "bullmq";

// Контроллер для обработки вебхуков от Бипиум
@Controller('bipium/webhook/order')
export class BipiumWebhookOrderContoller {
  constructor(
    @InjectQueue('addStorageQueue') private readonly addStorageQueue: Queue,
  ) {}

  @Post('create')
  async create(
    @Req() request: Request,
    @Body() body: any
  ) {
    const storage = await this.addStorageQueue.add('addStorage', {body})
    return storage;
  }
}