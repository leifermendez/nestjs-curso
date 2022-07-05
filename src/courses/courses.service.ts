import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './model/courses.schema';

interface ModelExt<T> extends Model<T> {
  delete:Function
}
@Injectable()
export class CoursesService {

  constructor(
    @InjectModel(Course.name) private readonly courseModel:ModelExt<CourseDocument>,
    @InjectModel(User.name) private readonly userModel:ModelExt<UserDocument>,
    ){

  }


  create(createCourseDto: CreateCourseDto) {
    const user = this.userModel.find()
    return this.courseModel.create(createCourseDto)
  }

  async findAll() {
    const list = this.courseModel.find({})
    return list
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  async remove(id: string) {
    const _id = new Types.ObjectId(id)
    const response = this.courseModel.delete({_id})
    return response
  }
}
