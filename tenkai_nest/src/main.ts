import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import Youtube from 'youtube-api';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ credentials: true });
    app.setGlobalPrefix('api/v2');
    app.use(cookieParser());

    const config = new DocumentBuilder().setTitle('Tenkai Academy API').setVersion('2.0').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-doc', app, document);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));

    Youtube.authenticate({
        type: 'key',
        key: app.get(ConfigService).get('youtube_api_key'),
    });

    await app.listen(app.get(ConfigService).get('port'));
}

bootstrap();
