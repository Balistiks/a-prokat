import { Body, Controller, Post, Req } from "@nestjs/common";
import { Queue, Worker } from "bullmq";
import { Request } from "express";

// Контроллер для обработки запросов по заявкам
@Controller('bipium/order')
export class BipiumOrderController {
  constructor() {}
}