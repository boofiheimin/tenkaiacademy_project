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
            const errObj = {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Invalid Fields',
                errors: Object.values(exception.errors).map((val) => val.message),
            };
            this.logger.error(errObj);
            response.status(HttpStatus.BAD_REQUEST).json(errObj);
        } else if (exception instanceof MongoError && exception.code === 11000) {
            const errObj = {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Duplicate field value',
            };
            this.logger.error(errObj);
            response.status(HttpStatus.BAD_REQUEST).json(errObj);
        } else {
            if (exception instanceof HttpException) {
                this.logger.error(exception.getResponse());
            }

            super.catch(exception, host);
        }
    }
}
