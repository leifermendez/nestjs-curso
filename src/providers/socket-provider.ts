import { Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayDisconnect,
  OnGatewayConnection,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { JwtHandle } from 'src/auth/utils/jwt-handle';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketProvider {
  constructor(private jwtHandle: JwtHandle) {}

  @WebSocketServer() serverGlobal: Socket;

  /**
   * Esta funcion se encarga de esuchcar el evento "join" que emite el front (angular, react, vue)
   */
  @SubscribeMessage('join')
  handleJoin(io: Socket, token: string) {
    //TODO salas "rooms"
    const { id } = this.jwtHandle.getIdByToken(token);
    io.join(`__room__${id}`);

    console.log('Se unio el dispositivo..', id)
  }

  @OnEvent('video.created') //TODO este evento proviene del eventEmitter
  getVideo(video: any) {
    this.serverGlobal.emit('video.created', video);
  }

  @OnEvent('video_user.created') //frank41@test.io
  sendVideosToUser(data: { video: any; id: string }) {
    console.log(data)
    this.serverGlobal
      .to(`__room__${data.id}`)
      .emit('video.created', data.video);
  }
}
