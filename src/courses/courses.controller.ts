import { Controller, Get, Post, Body, HttpCode,  Param, UseGuards, Req, Delete, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Rol } from 'src/decorators/rol.decorator';
import { JwtGuardGuard } from 'src/guards/jwt-guard.guard';
import { RolesGuardGuard } from 'src/guards/roles-guard.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { SlugPipe } from './pipes/slug.pipe';

@ApiTags('courses')

@UseGuards(JwtGuardGuard, RolesGuardGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Req() req:Request,  @Body() create:CreateCourseDto){
    return this.coursesService.create(create)
  }

  @Get('')
  @HttpCode(200)
  @Rol(['admin','user','manager'])
  getListCourses() {
    return this.coursesService.findAll()
  }

  @Get(':id')
  @HttpCode(200)
  @Rol(['admin','user','manager'])
  getDetail(@Param('id') id:string) {
    return this.coursesService.findOne(id)
  }

  @Patch(':id')
  @HttpCode(200)
  @Rol(['admin'])
  updateDetail(@Param('id') id:string, @Body() body:UpdateCourseDto) {
    return this.coursesService.update(id, body)
  }

  @Delete(':id')
  @HttpCode(200)
  @Rol(['admin','user','manager'])
  deleteCourse(@Param('id') id:string) {
    return this.coursesService.remove(id)
  }

}
