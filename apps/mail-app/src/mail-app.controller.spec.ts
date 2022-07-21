import { Test, TestingModule } from '@nestjs/testing';
import { MailAppController } from './mail-app.controller';
import { MailAppService } from './mail-app.service';

describe('MailAppController', () => {
  let mailAppController: MailAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MailAppController],
      providers: [MailAppService],
    }).compile();

    mailAppController = app.get<MailAppController>(MailAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mailAppController.getHello()).toBe('Hello World!');
    });
  });
});
