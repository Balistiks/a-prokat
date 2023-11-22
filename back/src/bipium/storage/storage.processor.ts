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
export class StorageProcessor extends WorkerHost {
  process(job: Job<any, any, string>, token?: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  constructor(
    private readonly httpService: HttpService
  ) {
    super();
  }
  @Process('addStorage')
  async processAddStorage(job: Job<any, any, string>): Promise<any> {
      const order = job.data.body;
      console.log(job.data)
      console.log(job.data.body)
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