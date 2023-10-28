import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {credentials: true, origin: process.env.CLIENT_URL}});
  app.use(cookieParser());
  const PORT = process.env.PORT || 8000;
  await app.listen(process.env.PORT, () => console.log('Started with ' + PORT));
}
bootstrap();
