/* eslint-disable @typescript-eslint/no-unused-vars */
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Server, Socket } from 'socket.io';
import { SpeechClient, protos } from '@google-cloud/speech';

@WebSocketGateway(8080, {
  allowEIO3: true, // 允许使用 EIO3
  cors: {
    origin: [
      'http://localhost:5501',
      'http://localhost:3000',
      'http://127.0.0.1:5501',
      'http://10.136.35.151:3000',
    ],
    credentials: true,
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  private speechClient = new SpeechClient({
    keyFilename: './google-cloud-credentials.json',
  });

  private getStreamConfig(): protos.google.cloud.speech.v1.IStreamingRecognitionConfig {
    return {
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'zh-TW',
      },
      interimResults: true, // For real-time captions
    };
  }

  constructor(private readonly socketService: SocketService) {}

  // 處理連線事件
  handleConnection(client: any) {
    console.log('client connected', client.id);
    let recognizeStream = null;
    client.on('join', function ({ name }: { name: string }) {
      console.log(`join ${name}`);
      client.emit('messages', 'Socket Connected to Server');
    });

    client.on('messages', function (data: any) {
      client.emit('broad', data);
    });

    client.on('startGoogleCloudStream', function () {
      console.log('startGoogleCloudStream');
      startRecognitionStream(this);
    });

    client.on('endGoogleCloudStream', function () {
      stopRecognitionStream();
    });

    client.on('binaryData', function (data) {
      if (recognizeStream !== null) {
        recognizeStream.write(data);
      }
    });

    const startRecognitionStream = (client) => {
      recognizeStream = this.speechClient
        .streamingRecognize(this.getStreamConfig())
        .on('error', console.error)
        .on('data', (data) => {
          process.stdout.write(
            data.results[0] && data.results[0].alternatives[0]
              ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
              : '\n\nReached transcription time limit, press Ctrl+C\n',
          );
          client.emit('speechData', data);

          if (data.results[0] && data.results[0].isFinal) {
            console.log('restarted stream serverside');
            stopRecognitionStream();
            startRecognitionStream(client);
          }
        });
    };

    function stopRecognitionStream() {
      if (recognizeStream) {
        recognizeStream.end();
      }
      recognizeStream = null;
    }
  }

  // 處理斷線事件
  handleDisconnect(client: any) {
    // Handle disconnection event
    console.log('client disconnected');
  }
}
