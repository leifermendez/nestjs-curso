import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PaginationV2Middleware implements NestMiddleware {
  use(req: RequestPaginateV2, res: Response, next: () => void) {
    /**
     *  queryparams
     * limit=10
     * page=2
     */
    const { limit = '5', page = '1' } = req.query;
    req.paginate = { limit, page };
    next();
  }
}

interface RequestPaginateV2 extends Request {
  paginate?: {
    limit: any;
    page: any;
  };
}
