import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: ["GET", "POST"],
    credentials: true
  });
  await app.listen(4000);
}
bootstrap();
