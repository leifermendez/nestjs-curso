import { Reflector } from '@nestjs/core';
import { RolesGuardGuard } from './roles-guard.guard';

describe('RolesGuardGuard', () => {

  let rolesGuardGuard:RolesGuardGuard;

  beforeEach(() => {
    rolesGuardGuard = new RolesGuardGuard(new Reflector)
  })

  it('should be defined', () => {
    expect(rolesGuardGuard).toBeDefined();
  });
});
