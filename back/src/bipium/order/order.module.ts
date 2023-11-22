import { Module } from "@nestjs/common";
import { BipiumOrderController } from "./order.controller";
import { BipiumOrderService } from "./order.service";
import { BipiumWebhookOrderContoller } from "./webhook-order.controller";

// Модуль для работы с заказами
@Module({
  imports: [],
  controllers: [BipiumOrderController, BipiumWebhookOrderContoller],
  providers: [BipiumOrderService]
})
export class BipiumOrderModule {}