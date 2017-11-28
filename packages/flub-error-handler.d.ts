import { ExceptionFilter } from '@nestjs/common';
export declare class FlubErrorHandler implements ExceptionFilter {
    private options;
    constructor(options?: any);
    catch(exception: Error, response: any): void;
}
