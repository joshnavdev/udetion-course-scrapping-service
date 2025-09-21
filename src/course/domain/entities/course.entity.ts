import { ModuleEntity } from './module.entity';

export interface CourseEntity {
  id: number;
  title: string;
  url: string;
  modules: ModuleEntity[];
}
