import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module';
import { AwardsModule } from './awards/awards.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { EventMailModule } from './event-mail/event-mail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailModule } from './mail/mail.module';
import { SocketProvider } from './providers/socket-provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CacheModule.register({
      ttl: 3600,
      max: 1000,
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-delete'), {
          overrideMethods: 'all',
        });
        return connection;
      },
    }),
    CoursesModule,
    AuthModule,
    VideosModule,
    AwardsModule,
    UsersModule,
    EventMailModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketProvider],
})
export class AppModule {}
