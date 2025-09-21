export interface ScrapeRequest {
  url: string;
}

export interface ScrapeResponse<T> {
  result: T;
  status: 'SUCCESS' | 'ERROR';
}

export interface ScrapperPort {
  scrape<T>(payload: ScrapeRequest): Promise<ScrapeResponse<T>>;
}
