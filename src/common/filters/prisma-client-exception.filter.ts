import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('PrismaClientExceptionFilter');

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        message = 'Unique constraint violation';
        break;

      case 'P2003':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed';
        break;

      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;

      case 'P2014':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Invalid ID provided';
        break;

      case 'P2021':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Table does not exist';
        break;

      case 'P2022':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Column does not exist';
        break;

      default:
        this.logger.error(`Unhandled Prisma Error: ${exception.code}`);
        this.logger.error(exception);
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.code,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
