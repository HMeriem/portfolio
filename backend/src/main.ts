import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
  });

  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}

void bootstrap();
