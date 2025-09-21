import { ScrapeRequest, ScrapeResponse, ScrapperPort } from '../../application/ports/scrapper.port';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import * as cheerio from 'cheerio';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { ModuleEntity } from '../../domain/entities/module.entity';
import { TopicEntity } from '../../domain/entities/topic.entity';

export class CourseScraperPuppeteerAdapter implements ScrapperPort, OnModuleInit, OnModuleDestroy {
  private browser: Browser;
  private $: cheerio.CheerioAPI;
  private readonly listContainerSelector = '.accordion-panel-module--panel--Eb0it';

  async scrape<T>(payload: ScrapeRequest): Promise<ScrapeResponse<T>> {
    try {
      const pageContent = await this.loadPage(payload.url);
      const courseDetail = this.getCourseDetailsFromHTML(pageContent);
      return { result: courseDetail as unknown as T, status: 'SUCCESS' };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async loadPage(url: string) {
    const page = await this.browser.newPage();
    await page.goto(url, { waitUntil: 'load' });
    await page.setViewport({ width: 1080, height: 1024 });

    const selector = '.clp-lead__title';
    await page.waitForSelector(selector);

    await page.waitForSelector(this.listContainerSelector);

    return page.content();
  }

  private getCourseDetailsFromHTML(pageContent: string) {
    this.$ = cheerio.load(pageContent);
    const courseData = this.$('#udemy').data();
    const { moduleArgs } = courseData as { moduleArgs: Record<string, string> };
    const title = moduleArgs.title;
    const courseId = moduleArgs.course_id;
    const $listContent = this.$(this.listContainerSelector);

    console.log({ title, courseId });

    const modules: ModuleEntity[] = [];
    $listContent.each((_, el) => {
      const $container = this.$(el);
      const module = this.getModuleInformationFromHeader($container);
      modules.push(module);
    });

    return { id: parseInt(courseId), title, url: '', modules };
  }

  private getModuleInformationFromHeader($container: cheerio.Cheerio<any>): ModuleEntity {
    const moduleIdSelector = '.ud-accordion-panel-toggler';
    const id = $container.find(moduleIdSelector).data('cssToggleId') as string;
    const $moduleHeader = $container.find('.ud-accordion-panel-title');
    const $moduleInfo = $moduleHeader.find('span');
    const title = $moduleInfo.eq(0).text();
    const time = $moduleInfo.eq(1).find('span').text();

    const $topicContainerList = $container.find('.ud-block-list li');

    const topics: TopicEntity[] = [];
    $topicContainerList.each((_, el) => {
      const $topicContainer = this.$(el);
      const topic = this.getTopicFromContainer($topicContainer);
      topics.push(topic);
    });

    return { id, title, time, topics };
  }

  private getTopicFromContainer($container: cheerio.Cheerio<any>): TopicEntity {
    const $topicInfo = $container.find('.ud-block-list-item-content');
    const title = $topicInfo.find('.section--item-title--EWIuI').text();
    const time = $topicInfo.find('.section--item-content-summary--Aq9em').text();
    return { title, time };
  }

  async onModuleInit() {
    puppeteer.use(StealthPlugin());
    this.browser = await puppeteer.launch();
    console.log('PuppeteerAdapter initialized.');
  }

  async onModuleDestroy() {
    await this.browser?.close();
  }
}
