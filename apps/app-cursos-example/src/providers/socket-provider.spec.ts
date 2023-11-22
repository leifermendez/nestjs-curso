import { Test, TestingModule } from '@nestjs/testing';
import { SocketProvider } from './socket-provider';
import { JwtHandle } from '../auth/utils/jwt-handle';
import { JwtService } from '@nestjs/jwt';

describe('SocketProvider', () => {
  let provider: SocketProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketProvider, JwtHandle, JwtService],
    }).compile();

    provider = module.get<SocketProvider>(SocketProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
