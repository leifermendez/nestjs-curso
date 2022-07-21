import { PaginatorMiddleware } from './paginator.middleware';

describe('PaginatorMiddleware', () => {
  it('should be defined', () => {
    expect(new PaginatorMiddleware()).toBeDefined();
  });
});
