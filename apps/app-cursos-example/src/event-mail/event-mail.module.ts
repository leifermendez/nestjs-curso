import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from '../users/model/user.schema';

@Module({})
export class EventMailModule {
  constructor(private readonly mailService: MailerService) {}

  @OnEvent('user.login')
  handleUserLoginEvent(user: any) {
    console.log('inicio_sesion', user);
    //Enviar email
  }

  @OnEvent('user.created')
  handleUserCreatedEvent(user: UserDocument) {
    console.log('user', user);
    this.mailService.sendMail({
      to: user.email,
      subject: 'Bienvenido a esta APP de NESTJS',
      template: 'welcome',
      context: {
        name: user.name,
      },
    });
    //Enviar email
  }
}
