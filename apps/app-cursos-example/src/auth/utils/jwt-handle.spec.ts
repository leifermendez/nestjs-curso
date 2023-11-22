import { JwtService } from '@nestjs/jwt';
import { JwtHandle } from './jwt-handle';

describe('JwtHandle', () => {
  let jwtHandle:JwtHandle;

  beforeEach(() => {
    jwtHandle = new JwtHandle(new JwtService())
  })

  it('should be defined', () => {
    expect(jwtHandle).toBeDefined();
  });
});
