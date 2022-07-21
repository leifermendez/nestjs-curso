import { Module } from '@nestjs/common';
import { MailAppController } from './mail-app.controller';
import { MailAppService } from './mail-app.service';

@Module({
  imports: [],
  controllers: [MailAppController],
  providers: [MailAppService],
})
export class MailAppModule {}
