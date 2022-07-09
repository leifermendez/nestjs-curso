import { PaginationV2Middleware } from './pagination-v2.middleware';

describe('PaginationV2Middleware', () => {
  it('should be defined', () => {
    expect(new PaginationV2Middleware()).toBeDefined();
  });
});
