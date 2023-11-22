import { InjectQueue, WorkerHost } from "@nestjs/bullmq";
import { Body, Controller, Post, Req } from "@nestjs/common";
import { Queue } from "bullmq";

// Контроллер для обработки вебхуков от Бипиум
@Controller('bipium/webhook/order')
export class BipiumWebhookOrderContoller {
  constructor(
    @InjectQueue('storageProcessor') private readonly storageProcessor: Queue,
  ) {}

  @Post('create')
  async create(
    @Req() request: Request,
    @Body() body: any
  ) {
    const storage = await this.storageProcessor.add('addStorage', {body})
    return storage;
  }
}