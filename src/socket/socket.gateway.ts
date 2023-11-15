import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(808, { namespace: '/chat' })
export class SocketGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('send_message')
  async onChat(@MessageBody() message: { sender: string; message: string }) {
    // 廣播消息給所有連線的客戶端
    this.server.emit('receive_message', message);
  }
}
