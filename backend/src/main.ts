import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SharedSecretMiddleware } from './middleware/sharedSecret.middleware';
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(new SharedSecretMiddleware().use);
  await app.listen(3000);
}
bootstrap();
