import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  allowEIO3: true, // 允许使用 EIO3
  cors: {
    origin: 'http://localhost:5500',
    credentials: true,
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly socketService: SocketService) {}

  // 處理連線事件
  handleConnection(client: any) {
    console.log('client connected');
  }

  // 處理斷線事件
  handleDisconnect(client: any) {
    // Handle disconnection event
    console.log('client disconnected');
  }

  @SubscribeMessage('transcribeEvent')
  listenClientAudioBuffer(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('onTranscribe', body);
    // this.server.emit('onTranscribe', body); // *
  }
}
