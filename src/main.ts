import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {

  const PORT = process.env.PORT || 3000

  const app = await NestFactory.create(AppModule,{
    cors:true
  });
  app.use(json({ limit: '60mb' }));


  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });


  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API NestJS Curso')
    .setDescription('Esta es la api del curso de Nestjs codigoencasa.com')
    .addTag('courses')
    .addTag('videos')
    .addTag('awards')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
