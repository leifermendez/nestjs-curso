import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({ timestamps: true })
export class Video {
    @Prop()
    title:string;

    @Prop()
    idCourse:mongoose.Types.ObjectId;

    @Prop()
    description:string;

    @Prop()
    source:string;

    @Prop()
    score:number;
}
export const VideoSchema = SchemaFactory.createForClass(Video);
