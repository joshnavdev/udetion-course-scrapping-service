import { Module } from '@nestjs/common';
import { CourseModule } from './course/interface/course.module';

@Module({
  imports: [CourseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
