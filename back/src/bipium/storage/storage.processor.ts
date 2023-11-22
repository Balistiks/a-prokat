import { HttpService } from "@nestjs/axios";
import { Process } from "@nestjs/bull";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

const headers = {
  'content-type': 'application/json',
  'Cookie': process.env.CONNECT_SID
}

@Processor('storageProcessor')
export class StorageProcessor {
  constructor(
    private readonly httpService: HttpService
  ) {}
  @Process('addStorage')
  async processAddStorage(job: Job<any, any, string>): Promise<any> {
      const order = job.data.body;
      const storage = {
        'values': {
          '3': [{
            'catalogId': order.catalogId,
            'recordId': order.recordId
          }],
          '4': order.values['3']
        }
      }
      try {
        const response = this.httpService.post(
          `https://${process.env.BIPIUM_DOMEN}.bpium.ru/api/v1/catalogs/14/records`,
          storage,
          {
            headers: headers
          }
        )
        return response;
      } catch (e) {
        Logger.log('Ошибка при cоздании склада:', e.message)
      }
  }
}