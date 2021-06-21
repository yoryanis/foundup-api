import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v2');

  const options = new DocumentBuilder()
    .setTitle('Lost & Found')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v2/docs', app, document);

  app.use(urlencoded({ limit: '50mb', extended: false }));
  app.use(json({ limit: '50mb' }));

  await app.listen(AppModule.port);
}
bootstrap();
