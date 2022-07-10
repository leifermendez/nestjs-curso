import { Test, TestingModule } from '@nestjs/testing';
import { SocketProvider } from './socket-provider';

describe('SocketProvider', () => {
  let provider: SocketProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketProvider],
    }).compile();

    provider = module.get<SocketProvider>(SocketProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
