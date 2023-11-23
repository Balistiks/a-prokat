import { Module } from "@nestjs/common";
import { BipiumOrderController } from "./order.controller";
import { BipiumOrderService } from "./order.service";
import { BipiumWebhookOrderContoller } from "./webhook-order.controller";
import { BipiumStorageModule } from "../storage/storage.module";
import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { OrderProcessor } from "./order.processor";

// Модуль для работы с заказами
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'orderProcessor',
      redis: {
        host: 'redis',
        port: 6379
      }
    }),
    BipiumStorageModule,
    HttpModule
  ],
  controllers: [BipiumOrderController, BipiumWebhookOrderContoller],
  providers: [BipiumOrderService, OrderProcessor]
})
export class BipiumOrderModule {}