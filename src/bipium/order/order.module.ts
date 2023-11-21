import { Module } from "@nestjs/common";
import { BipiumOrderController } from "./order.controller";
import { BipiumOrderService } from "./order.service";

// Модуль для работы с заказами
@Module({
  imports: [],
  controllers: [BipiumOrderController],
  providers: [BipiumOrderService]
})
export class BipiumOrderModule {}