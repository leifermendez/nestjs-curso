import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video, VideoDocument } from './model/video.schema';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
    private readonly videoModel: ModelExt<VideoDocument>,
  ) {}

  create(createVideoDto: CreateVideoDto) {
    return this.videoModel.create(createVideoDto);
  }

  findAll() {
    return this.videoModel.find({})
  }

  findOne(id: string) {
    return this.videoModel.findOne({ id });
  }

  update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.videoModel.findOneAndUpdate({ id }, updateVideoDto, {
      new: true,
      upsert: true,
    });
  }

  remove(id: string) {
    return this.videoModel.delete({ id });
  }
}

interface ModelExt<T> extends Model<T> {
  delete: Function;
}
