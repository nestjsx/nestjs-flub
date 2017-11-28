import { IOptions } from '../interfaces/options.interface';
export declare class ErrorParser {
    viewQuote: boolean;
    private readonly error;
    constructor(error: any, options?: IOptions);
    /**
     * Serializes stack to Mustache friendly object to
     * be used within the view. Optionally can pass
     * a callback to customize the frames output.
     *
     * @param  {Object} stack
     * @param  {Function} [callback]
     *
     * @return {Object}
     */
    serialize(stack: object, callback?: any): object;
    /**
     * Parses the error stack and returns serialized
     * frames out of it.
     *
     * @return {Promise<Object>}
     */
    parse(): Promise<object>;
    private randomQuote();
}
