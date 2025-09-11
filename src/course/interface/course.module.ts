import { Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';

@Module({
  controllers: [CourseController],
})
export class CourseModule {}
