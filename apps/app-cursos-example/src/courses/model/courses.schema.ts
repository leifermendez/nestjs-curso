import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  price: number;

  @Prop({ required: true })
  idAuthor: string;

  @Prop()
  description: string;

  @Prop()
  cover: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.statics.findAllCourses = function () {
  //TODO Estamos trabajanado en la collection de COURSES
  const list = this.aggregate([
    {
      $lookup: {
        from: 'users', //TODO
        foreignField: 'id',
        localField: 'idAuthor',
        as: 'author',
        pipeline: [
          //TODO esto actuando sobre la collection de users
          {
            $project: {
              _id: 0,
              name: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: '$author',
    },
  ]);

  return list;
};
