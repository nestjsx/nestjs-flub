import { Catch, ExceptionFilter } from '@nestjs/common';
import { ErrorHandler } from './error-handler';
import { IOptions } from './interfaces/options.interface';
@Catch(Error)
export class FlubErrorHandler implements ExceptionFilter {
    private options: IOptions;
    constructor(options?: any) {
        this.options = options;
    }

    catch(exception: Error, response) {
        new ErrorHandler(exception, this.options).toHTML().then((data) => {
            response.status(500).send(data);
        }).catch((e) => {
            console.log(e);
        });
    }
}
