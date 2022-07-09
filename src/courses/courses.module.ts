import { MongooseModule } from '@nestjs/mongoose';
import { CacheInterceptor, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseSchema } from './model/courses.schema';
import { User, UserSchema } from 'src/users/model/user.schema';
import { PaginatorMiddleware } from 'src/paginator.middleware';
import { PaginationV2Middleware } from 'src/pagination-v2.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';

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
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(PaginationV2Middleware)
    .forRoutes({ path: 'v1/courses', method: RequestMethod.GET });
  }
}
