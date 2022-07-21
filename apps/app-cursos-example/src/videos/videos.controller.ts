import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Rol } from '../decorators/rol.decorator';
import { RolesGuardGuard } from '../guards/roles-guard.guard';
import { JwtGuardGuard } from '../guards/jwt-guard.guard';
import { storage } from '../utils/media.handle';

@ApiTags('videos')
@ApiBearerAuth()
@UseGuards(JwtGuardGuard, RolesGuardGuard)
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @Rol(['admin'])
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Post('upload/:id') //TODO AQUI! ojo
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Rol(['admin'])
  @UseInterceptors(FileInterceptor('file', { storage }))
  upload(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.videosService.addVideo(id, file.filename);
  }

  @Get()
  @Rol(['user', 'manager', 'admin'])
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  @Rol(['user', 'manager', 'admin'])
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch(':id')
  @Rol(['admin'])
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @Rol(['admin'])
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
