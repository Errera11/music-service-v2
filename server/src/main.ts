import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT, () => console.log('Started with 8000'));
}
bootstrap();
