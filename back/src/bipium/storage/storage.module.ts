import { Module } from "@nestjs/common";
import { BipiumStorageService } from "./storage.service";
import { BullModule } from "@nestjs/bullmq";
import { StorageProcessor } from "./storage.processor";
import { HttpModule } from "@nestjs/axios";

// Модуль для работы со складами
@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'storageProcessor',
      connection: {
        host: 'redis',
        port: 6379
      }
    })
  ],
  controllers: [],
  providers: [
    BipiumStorageService,
    StorageProcessor,
  ],
})
export class BipiumStorageModule {}