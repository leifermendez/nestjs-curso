import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuardGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRolMeta = this.reflector.get<string[]>(
      'rol',
      context.getHandler(),
    );

    const req = context.getArgByIndex(0);
    const { roles } = req.user;

    //TODO array roles que tiene el usuario ['admin'] DB
    //TODO array roles permitidos para este controlador ['admin','manager']

    const isAllow = roles.some((rol) => getRolMeta.includes(rol));
    return isAllow;
  }
}
