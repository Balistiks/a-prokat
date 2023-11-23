import { HttpService } from "@nestjs/axios";
import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { Job } from "bullmq";
import { catchError, firstValueFrom } from "rxjs";

const headers = {
  'content-type': 'application/json',
}

@Processor('storageProcessor')
export class StorageProcessor{
  constructor(
    private readonly httpService: HttpService
  ) {
  }
  private readonly logger = new Logger(StorageProcessor.name);

  // Процесс по дабовлению скалада с коменатрием и связь заказа
  @Process('addStorage')
  async processAddStorage(job: Job<any, any, string>): Promise<any> {
    try {
      // Данные заказа
      const order = job.data;
      this.logger.debug(job.data)
      // Приведения данных в вид для отправки
      const storage = {
        'values': {
          '3': [{
            'catalogId': order.catalogId,
            'recordId': order.recordId
          }],
          '4': order.values['3']
        }
      }
      // Обращение к сервису Бипиум для создания склада
      const { data } = await firstValueFrom(this.httpService.post(
        `https://${process.env.BIPIUM_DOMEN}.bpium.ru/api/v1/catalogs/14/records`,
        storage,
        {
          headers: headers,
          auth: {
            username: process.env.LOGIN,
            password: process.env.PASSWORD,
          }
        }
      ).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'Ошибка при обращении к сервису';
        }),
      ))
      this.logger.debug(data)
    } catch (e) {
      this.logger.debug('Ошибка при cоздании склада:', e.message)
    }
  }
}