import { JwtGuardGuard } from './jwt-guard.guard';

describe('JwtGuardGuard', () => {
  it('should be defined', () => {
    expect(new JwtGuardGuard()).toBeDefined();
  });
});
