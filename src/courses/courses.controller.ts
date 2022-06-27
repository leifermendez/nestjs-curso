import { Controller, Get, Post, Body, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { SlugPipe } from './pipes/slug.pipe';

@ApiTags('courses')

@Controller('courses') //TODO http://localhost:3000/v1/courses
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() create:CreateCourseDto){
    return this.coursesService.create(create)
  }

  @Get(':title')
  getDetail(@Param('title', new SlugPipe()) title:string){//TODO el mejor libro del mundo
    //TODO el-mejor-libro-del-mundo
    console.log('___TITLE____',title)
    return this.coursesService.findOne(1)
  }

}
