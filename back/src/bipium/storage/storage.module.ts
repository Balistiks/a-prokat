import { Module } from "@nestjs/common";
import { BipiumStorageService } from "./storage.service";
import { HttpModule } from "@nestjs/axios";
import { StorageProcessor } from "./storage.processor";
import { BullModule } from "@nestjs/bull";

// Модуль для работы со складами
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'storageProcessor',
      redis: {
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
  exports: [StorageProcessor, BullModule]
})
export class BipiumStorageModule {}