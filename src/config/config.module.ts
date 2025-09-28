import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validationSchema } from './validationSchema';
import AppConfig from './configApp';
import KafkaConfig from './kafka.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, KafkaConfig],
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
