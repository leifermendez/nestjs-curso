import { SetMetadata } from '@nestjs/common';

export const Rol = (args: string[]) => SetMetadata('rol', args);
