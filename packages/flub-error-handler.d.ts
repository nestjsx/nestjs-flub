import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { IOptions } from './interfaces/options.interface';
export declare class FlubErrorHandler implements ExceptionFilter {
    private options;
    constructor(options?: IOptions);
    catch(exception: Error, host: ArgumentsHost): void;
}
