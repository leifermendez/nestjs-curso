import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    default:['user']
  })
  roles: string[];

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  description: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
