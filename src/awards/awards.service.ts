import { Injectable } from '@nestjs/common';

@Injectable()
export class AwardsService {
  create() {
    return 'This action adds a new award';
  }

  findAll() {
    return `This action returns all awards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} award`;
  }

  update(id: number) {
    return `This action updates a #${id} award`;
  }

  remove(id: number) {
    return `This action removes a #${id} award`;
  }
}
