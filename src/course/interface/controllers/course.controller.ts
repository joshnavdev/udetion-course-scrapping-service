import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CourseController {
  @MessagePattern('course-test-2')
  courseTest() {
    console.log('course-test');
  }
}
