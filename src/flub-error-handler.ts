import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ErrorHandler } from './error-handler';
import { FlubOptions } from './interfaces';

@Catch(Error)
export class FlubErrorHandler implements ExceptionFilter {
  private options: FlubOptions;

  constructor(options: FlubOptions = { theme: 'dark', quote: false }) {
    this.options = options;
  }

  catch(exception: Error, host: ArgumentsHost) {
    new ErrorHandler(exception, this.options)
      .toHTML()
      .then(data => {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        
        response.header('Content-Type', 'text/html; charset=UTF-8');
        response.status(500).send(data);
      })
      .catch(e => {
        Logger.error(e.message, e.context);
      });
  }
}
