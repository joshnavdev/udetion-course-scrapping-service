import { TopicEntity } from './topic.entity';

export interface ModuleEntity {
  id: string;
  title: string;
  time: string;
  topics: TopicEntity[];
}
