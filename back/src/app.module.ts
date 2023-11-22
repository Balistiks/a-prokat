import { Module } from '@nestjs/common';
import { BipiumModule } from './bipium/bipium.module';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: 'redis',
        port: 6379
      }
    }),
    BipiumModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
