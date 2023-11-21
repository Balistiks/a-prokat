import { Module } from "@nestjs/common";
import { BipiumStorageService } from "./storage.service";

// Модуль для работы со складами
@Module({
  imports: [],
  controllers: [],
  providers: [BipiumStorageService],
})
export class BipiumStorageImport {}