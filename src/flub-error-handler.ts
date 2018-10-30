import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ErrorHandler } from './error-handler';
import { IOptions } from './interfaces/options.interface';
@Catch(Error)
export class FlubErrorHandler implements ExceptionFilter {
    private options: IOptions;
    constructor(options: IOptions = {theme: 'dark', quote: false}) {
        this.options = options;
    }

    catch(exception: Error, host: ArgumentsHost) {
        new ErrorHandler(exception, this.options).toHTML().then((data) => {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();

            response.status(500).send(data);
        }).catch((e) => {
            console.log(e);
        });
    }
}
