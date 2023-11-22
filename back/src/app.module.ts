import { Module } from '@nestjs/common';
import { BipiumModule } from './bipium/bipium.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
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
