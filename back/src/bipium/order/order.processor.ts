import { HttpService } from "@nestjs/axios";
import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { Job } from "bullmq";
import { catchError, firstValueFrom } from "rxjs";
import { BipiumOrderService } from "./order.service";

const headers = {
  'content-type': 'application/json',
}

// Процессор очереди по заявкам
@Processor('orderProcessor')
export class OrderProcessor {
  constructor(
    private readonly httpService: HttpService,
    private readonly bipiumOrderService: BipiumOrderService,
  ) {}
  private readonly logger = new Logger(OrderProcessor.name)

  // Процесс по изменению коментария заявки на данные из https://test.bpium.ru/api/webrequest/request
  @Process('updateOrderComment')
  async processorUpdateOrderComment(job: Job<any, any, string>): Promise<any> {
    try {
      // Данные заказа
      const orderData = job.data;
      this.logger.debug(orderData);
      const comment = await this.bipiumOrderService.getCommentForOrder()
      this.logger.debug(comment)
      // Данные для изменения
      const order = {
        'values': {
          '3': comment.value
        }
      }
      // Обращение к сервису Бипиум для изменения комментария заказа
      const { data } = await firstValueFrom(this.httpService.patch(
        `https://${process.env.BIPIUM_DOMEN}.bpium.ru/api/v1/catalogs/13/records/${orderData.recordId}`,
        order,
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
      this.logger.error('Ошибка при изменении заказа:', e.message)
    }
  }
}