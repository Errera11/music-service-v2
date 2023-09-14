import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import * as cookieParser from 'cookie-parser';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {credentials: true, origin: process.env.CLIENT_URL}});
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  const PORT = process.env.PORT || 8000;
  await app.listen(process.env.PORT, () => console.log('Started with ' + PORT));
}
bootstrap();
