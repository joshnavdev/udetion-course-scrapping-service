import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ScrapeCourseDto } from '../../domain/dtos/scrapeCourse.dto';
import { COURSE_SCRAPPER_PORT } from '../../domain/constants/tokens';
import { ScrapperPort } from '../../application/ports/scrapper.port';
import { CourseEntity } from '../../domain/entities/course.entity';

@Controller()
export class CourseController {
  private readonly logger = new Logger(CourseController.name);
  constructor(@Inject(COURSE_SCRAPPER_PORT) private readonly courseScraper: ScrapperPort) {}

  @MessagePattern('create_course')
  async courseTest(@Payload() data: ScrapeCourseDto) {
    this.logger.log('Received data for course scraping:', JSON.stringify(data));
    const course = await this.courseScraper.scrape<CourseEntity>(data);

    if (!course) throw new RpcException('Course not found');

    return course;
  }
}
