import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggerInterceptor } from 'src/utils/logger.interceptor';
import { storage } from 'src/utils/media.handle';
import { CoursesService } from 'src/courses/courses.service';

@ApiTags('videos')
@UseInterceptors(LoggerInterceptor)
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService,
    ) {}

  @Post()  
  @UseInterceptors(FileInterceptor('file', {storage}))
  create(@Body() createVideoDto: CreateVideoDto, @UploadedFile() file:Express.Multer.File) {
    console.log(file)
    return this.videosService.create(createVideoDto);
  }


  @Get() 
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
