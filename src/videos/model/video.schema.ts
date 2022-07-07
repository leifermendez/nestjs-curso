import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type VideoDocument = Video & Document;

@Schema({ timestamps: true })
export class Video {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop()
  title: string;

  @Prop({ required: true })
  idCourse: string;

  @Prop()
  description: string;

  @Prop({default:null})
  source: string;

  @Prop({default:0})
  score: number;
}
export const VideoSchema = SchemaFactory.createForClass(Video);
