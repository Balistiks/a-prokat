import { Module } from '@nestjs/common';
import { BipiumOrderModule } from './order/order.module';
import { BipiumStorageModule } from './storage/storage.module';

// Модуль для работы с сервсом Бипиум
@Module({
  imports: [
    BipiumOrderModule,
    BipiumStorageModule
  ]
})
export class BipiumModule {}
