import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MongoError } from 'mongodb';
import { Error } from 'mongoose';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private logger = new Logger();

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception instanceof Error.ValidationError) {
            this.logger.error({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Invalid Fields',
                errors: Object.values(exception.errors).map((val) => val.message),
            });
            response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Invalid Fields',
                errors: Object.values(exception.errors).map((val) => val.message),
            });
        } else if (exception instanceof MongoError && exception.code === 11000) {
            this.logger.error({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Duplicate field value',
            });
            response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Duplicate field value',
            });
        } else {
            if (exception instanceof HttpException) {
                this.logger.error({
                    statusCode: exception.getStatus(),
                    message: exception.getResponse(),
                });
            }

            super.catch(exception, host);
        }
    }
}
