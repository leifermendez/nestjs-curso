import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses') 
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post() 
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id') //TODO HTTP GET http://localhost:3002/courses/:id
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')//TODO HTTP PATCH http://localhost:3002/courses/:id
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id') //TODO HTTP DELETE http://localhost:3002/courses/:id
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
