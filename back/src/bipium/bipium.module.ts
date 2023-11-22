import { Module } from '@nestjs/common';
import { BipiumOrderModule } from './order/order.module';
import { BipiumStorageImport } from './storage/storage.module';

// Модуль для работы с сервсом Бипиум
@Module({
  imports: [
    BipiumOrderModule,
    BipiumStorageImport,
  ]
})
export class BipiumModule {}
