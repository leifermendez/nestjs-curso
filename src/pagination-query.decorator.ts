import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const PaginationQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();
    const pagination = request.pagination;
    return pagination;
  },
);
