import { Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';
import { COURSE_SCRAPPER_PORT } from '../domain/constants/tokens';
import { CourseScraperPuppeteerAdapter } from '../infrastructure/scraper/courseScraper.puppeteer.adapter';

@Module({
  controllers: [CourseController],
  providers: [
    {
      provide: COURSE_SCRAPPER_PORT,
      useClass: CourseScraperPuppeteerAdapter,
    },
  ],
})
export class CourseModule {}
