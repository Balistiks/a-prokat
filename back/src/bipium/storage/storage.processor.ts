import { HttpService } from "@nestjs/axios";
import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

const headers = {
  'content-type': 'application/json',
  'Cookie': process.env.CONNECT_SID
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
      const order = job.data.body;
      this.logger.debug(job.data)
      this.logger.debug(job.data.body)
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
        this.logger.debug(response)
      } catch (e) {
        this.logger.debug('Ошибка при cоздании склада:', e.message)
      }
  }
}