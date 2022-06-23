import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()  
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto)
    return this.videosService.create(createVideoDto);
  }

  @Get() 
  findAll(@Query('id') id:string) {
    console.log(id)
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('Que tengo aqui?',id)
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
