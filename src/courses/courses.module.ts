import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './model/courses.schema';
import { User, UserSchema } from 'src/users/model/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {name:Course.name, schema:CourseSchema},
        {name:User.name, schema:UserSchema},
      ]
    )
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports:[CoursesService]
})
export class CoursesModule {}
