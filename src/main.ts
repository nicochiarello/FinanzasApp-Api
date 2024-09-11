import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService); // Obtener una instancia de ConfigService
  const PORT = configService.get<number>('PORT') || 8080; // Obtener la variable PORT desde ConfigService

  app.setGlobalPrefix('api');

  await app.listen(PORT);
  Logger.log(`🚀 Server running on port ${PORT}`, 'Bootstrap');
}
bootstrap();
