import { Module } from "@nestjs/common";
import { BipiumOrderController } from "./order.controller";
import { BipiumOrderService } from "./order.service";
import { BipiumWebhookOrderContoller } from "./webhook-order.controller";
import { BipiumStorageModule } from "../storage/storage.module";

// Модуль для работы с заказами
@Module({
  imports: [
    BipiumStorageModule
  ],
  controllers: [BipiumOrderController, BipiumWebhookOrderContoller],
  providers: [BipiumOrderService]
})
export class BipiumOrderModule {}