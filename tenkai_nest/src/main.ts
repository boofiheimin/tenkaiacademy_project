import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import path from 'path';
import dotenv from 'dotenv';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v2');

    const config = new DocumentBuilder().setTitle('Tenkai Academy API').setVersion('2.0').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));

    await app.listen(app.get(ConfigService).get('port'));
}

bootstrap();
