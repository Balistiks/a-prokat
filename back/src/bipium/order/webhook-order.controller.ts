import { Body, Controller, Post, Req } from "@nestjs/common";

// Контроллер для обработки вебхуков от Бипиум
@Controller('bipium/webhook/order')
export class BipiumWebhookContoller {
  constructor() {}

  @Post('create')
  async create(
    @Req() request: Request,
    @Body() body: any
  ) {

  }
}