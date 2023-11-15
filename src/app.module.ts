import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranscribeModule } from './transcribe/transcribe.module';
import { SocketModule } from './socket/socket.module';
@Module({
  imports: [TranscribeModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
