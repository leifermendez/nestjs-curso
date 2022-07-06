import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type VideoDocument = Video & Document;

@Schema({ timestamps: true })
export class Video {
    @Prop({ unique: true, default: uuidv4() })
    id: string;

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
