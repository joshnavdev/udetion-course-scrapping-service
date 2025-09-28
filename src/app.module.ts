import { Module } from '@nestjs/common';
import { CourseModule } from './course/interface/course.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [CourseModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
