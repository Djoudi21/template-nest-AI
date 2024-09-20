import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip any properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if unknown properties are provided
      transform: true, // Automatically transform payloads to match the DTO class
    }),
  );

  await app.listen(3000);
}
bootstrap();
