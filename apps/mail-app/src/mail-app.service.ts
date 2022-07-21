import { Injectable } from '@nestjs/common';

@Injectable()
export class MailAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
