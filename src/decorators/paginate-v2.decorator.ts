import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginateV2 = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    //TODO http request response
    const request: any = ctx.switchToHttp().getRequest();
    const paginate = request.paginate; //TODO ya viene con esta propiedad
    return paginate;
  },
);
