import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AsyncOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncOptions<MicroserviceOptions>>(AppModule, {
    inject: [],
    useFactory: () => {
      return {
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'course-scrapping-consumer',
            brokers: ['localhost:9092'],
          },
        },
      };
    },
  });

  await app.listen();
}
bootstrap();
