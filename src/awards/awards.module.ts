import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';

@Module({
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule {}
