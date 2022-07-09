import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PaginatorMiddleware implements NestMiddleware {
  use(req: RequestPagination, res: Response, next: () => void) {
    /**
     * page: 2
     * limit: 50
     */

    const { page = 0, limit = 10 } = req.query;
    console.log(req.query);
    req.pagination = { page, limit };

    next();
  }
}

interface RequestPagination extends Request {
  pagination: any;
}
