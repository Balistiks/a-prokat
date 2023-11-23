import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";

// Работа с заказами в Бипиум
@Injectable()
export class BipiumOrderService {
  constructor(
    private readonly httpService: HttpService
  ) {}
  private readonly logger = new Logger()

  // Получение комментария для заказа
  async getCommentForOrder() {
    // Получение данных для комментария из https://test.bpium.ru/api/webrequest/request
    const { data } = await firstValueFrom(this.httpService.get(
      'https://test.bpium.ru/api/webrequest/request',
    ).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(error.response.data)
        throw 'Ошибка при обращении к сервису';
      })
    ))
    return data;
  }
}