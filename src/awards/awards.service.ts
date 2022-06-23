import { Injectable } from '@nestjs/common';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';

@Injectable()
export class AwardsService {
  create(createAwardDto: CreateAwardDto) {
    return 'This action adds a new award';
  }

  findAll() {
    return `This action returns all awards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} award`;
  }

  update(id: number, updateAwardDto: UpdateAwardDto) {
    return `This action updates a #${id} award`;
  }

  remove(id: number) {
    return `This action removes a #${id} award`;
  }
}
