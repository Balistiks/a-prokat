import { Module } from "@nestjs/common";
import { BipiumStorageService } from "./storage.service";
import { StorageProcessor } from "./storage.processor";
import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bullmq";

// Модуль для работы со складами
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'storageProcessor',
      connection: {
        host: 'redis',
        port: 6379
      }
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [
    BipiumStorageService,
    StorageProcessor,
  ],
  exports: [
    StorageProcessor,
    BullModule
  ]
})
export class BipiumStorageModule {}