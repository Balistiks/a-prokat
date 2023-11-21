import { Module } from '@nestjs/common';
import { BipiumModule } from './bipium/bipium.module';

@Module({
  imports: [BipiumModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
