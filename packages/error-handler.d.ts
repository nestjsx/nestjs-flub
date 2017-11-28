import { IOptions } from './interfaces/options.interface';
export declare class ErrorHandler {
    private VIEW_PATH;
    private viewTemplate;
    private readonly error;
    private readonly errorParser;
    constructor(error: any, options?: IOptions);
    /**
     * Returns error stack as JSON.
     *
     * @return {Promise}
     */
    toJSON(): Promise<object>;
    /**
     * Returns HTML representation of the error stack
     * by parsing the stack into frames and getting
     * important info out of it.
     *
     * @return {Promise}
     */
    toHTML(): Promise<any>;
    /**
     * Returns classes to be used inside HTML when
     * displaying the frames list.
     *
     * @param  {Object}
     * @param  {Number}
     *
     * @return {String}
     */
    private getDisplayClasses(frame, index);
    /**
     * Compiles the view using HTML
     *
     * @param  {String}
     * @param  {Object}
     *
     * @return {String}
     */
    private complieView(view, data);
}
