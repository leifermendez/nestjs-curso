import { MongooseModule } from '@nestjs/mongoose';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './model/courses.schema';
import { User, UserSchema } from '../users/model/user.schema';
import { PaginationV2Middleware } from '../middleware/pagination-v2.middleware';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;
          schema.plugin(require('mongoose-paginate-v2'));
          return schema;
        },
      },
    ]),
    CacheModule.register()
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationV2Middleware)
      .forRoutes({ path: 'v1/courses', method: RequestMethod.GET });
  }
}
