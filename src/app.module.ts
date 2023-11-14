import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexController } from './transcribe/index.controller';
import { TranscribeModule } from './transcribe/transcribe.module';

@Module({
  imports: [TranscribeModule],
  controllers: [AppController, IndexController],
  providers: [AppService],
})
export class AppModule {}
