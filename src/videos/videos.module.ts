import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { CoursesModule } from 'src/courses/courses.module';
import { Video, VideoSchema } from './model/video.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Video.name,
        schema:VideoSchema
      }
    ])
  ],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {}
