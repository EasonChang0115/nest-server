import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranscribeModule } from './transcribe/transcribe.module';
import { SocketGateway } from './socket/socket.gateway';
@Module({
  imports: [TranscribeModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
