import { Module } from "@nestjs/common";
import { BipiumStorageService } from "./storage.service";

@Module({
  imports: [],
  controllers: [],
  providers: [BipiumStorageService],
})
export class BipiumStorageImport {}