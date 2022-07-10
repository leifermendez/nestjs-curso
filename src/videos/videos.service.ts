import { EventEmitter2 } from '@nestjs/event-emitter';
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
    private eventEmitter:EventEmitter2
  ) {}

  async create(createVideoDto: CreateVideoDto) {
    const video = await this.videoModel.create(createVideoDto)
    // this.eventEmitter.emit('video.created', video)
    const idUser = '62c5dad07d3cecafbf26cb5c';
    this.eventEmitter.emit('video_user.created', {id:idUser,video})
    return video
  }

  addVideo(id: string, filename: string) {
    return this.videoModel.findOneAndUpdate(
      { id },
      { source: filename },
      {
        new: true,
        upsert: true,
      },
    );
  }

  findAll() {
    return this.videoModel.find({});
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
  delete: (data: { id: string }) => void;
}
