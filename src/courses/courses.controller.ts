import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Param,
  UseGuards,
  Req,
  Delete,
  Patch,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Rol } from 'src/decorators/rol.decorator';
import { JwtGuardGuard } from 'src/guards/jwt-guard.guard';
import { RolesGuardGuard } from 'src/guards/roles-guard.guard';
import { PaginateV2 } from 'src/decorators/paginate-v2.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('courses')
@UseGuards(JwtGuardGuard, RolesGuardGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(201)
  @Rol(['admin'])
  create(@Req() _req: Request, @Body() create: CreateCourseDto) {
    return this.coursesService.create(create);
  }

  @Get('') //TODO la lista
  @HttpCode(200)
  @UseInterceptors(CacheInterceptor)
  @Rol(['admin', 'user', 'manager'])
  getListCourses(@PaginateV2() pagination: any) {
    return this.coursesService.findAll(pagination);
  }

  @Get(':id')
  @HttpCode(200)
  @Rol(['admin', 'user', 'manager'])
  getDetail(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  @Rol(['admin'])
  updateDetail(@Param('id') id: string, @Body() body: UpdateCourseDto) {
    return this.coursesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  @Rol(['admin', 'user', 'manager'])
  deleteCourse(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
