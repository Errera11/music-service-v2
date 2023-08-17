import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import {BadRequestException, ValidationPipe} from "@nestjs/common";
import {ValidationError} from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
            const invalidProperty = validationErrors[0].property;
            const errMessage = Object.values(validationErrors[0].constraints)[0];
            return new BadRequestException([{
                property: invalidProperty,
                constraints: errMessage.charAt(0).toUpperCase() + errMessage.slice(1)
            }]);
        },
      }),
  );
  app.enableCors();
  await app.listen(process.env.PORT, () => console.log('Started with 8000'));
}
bootstrap();
