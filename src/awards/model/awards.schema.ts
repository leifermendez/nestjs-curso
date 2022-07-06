import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type AwardsDocument = Awards & Document;

@Schema({ timestamps: true })
export class Awards {
    @Prop({ unique: true, default: uuidv4() })
    id: string;

    @Prop()
    title:string;

    @Prop()
    idUser:mongoose.Types.ObjectId;

    @Prop()
    description:string

}
export const AwardsSchema = SchemaFactory.createForClass(Awards);
