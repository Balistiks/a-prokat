import { HttpService } from "@nestjs/axios";
import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

const headers = {
  'content-type': 'application/json',
  'Authorization': process.env.AUTHORIZATION
}

@Processor('storageProcessor')
export class StorageProcessor{
  constructor(
    private readonly httpService: HttpService
  ) {
  }
  private readonly logger = new Logger(StorageProcessor.name);

  @Process('addStorage')
  async processAddStorage(job: Job<any, any, string>): Promise<any> {
    try {
      const order = job.data;
      this.logger.debug(job.data)
      const storage = {
        'values': {
          '3': [{
            'catalogId': order.catalogId,
            'recordId': order.recordId
          }],
          '4': order.values['3']
        }
      }
      const response = this.httpService.post(
        `https://${process.env.BIPIUM_DOMEN}.bpium.ru/api/v1/catalogs/14/records`,
        storage,
        {
          headers: headers
        }
      )
      this.logger.debug(JSON.stringify(response))
    } catch (e) {
      this.logger.debug('Ошибка при cоздании склада:', e.message)
    }
  }
}