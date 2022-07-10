import { Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketProvider
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() serverGlobal: Socket;

  @OnEvent('video.created')
  getVideo(video: any) {
    this.serverGlobal.emit('video.created', video);
  }

  afterInit(server: any) {
    //TODO Se llama cuando se inicia el servicio de WS
  }

  handleConnection(client: any, ...args: any[]) {
    //TODO Se llama cuando un cliente de conecta
    console.log('_Un cliente se conecto_ID:', client.id);
  }

  handleDisconnect(client: any) {
    //TODO cuando un cliente se desconecta
    console.log('_Un cliente se desconecto_ID:', client.id);
  }
}
