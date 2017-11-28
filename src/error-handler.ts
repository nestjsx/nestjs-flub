import * as fs from 'fs';
import * as Mustache from 'mustache';
import * as path from 'path';
import { IOptions } from './interfaces/options.interface';
import { ErrorParser } from './parser/error-parser';
import { FrameParser } from './parser/frame-parser';
export class ErrorHandler {
    private  VIEW_PATH: string = './themes/error.default.mustache';
    private  viewTemplate = fs.readFileSync(path.join(__dirname, this.VIEW_PATH), 'utf-8');
    private readonly error: any;
    private readonly errorParser: ErrorParser;

    constructor(error, options?: IOptions) {
        this.error = error;
        if (options.theme) {
            this.VIEW_PATH = `./themes/error.${options.theme}.mustache`;
            this.viewTemplate = fs.readFileSync(path.join(__dirname, this.VIEW_PATH), 'utf-8');
        }
        this.errorParser = new ErrorParser(error, options);
    }

    /**
     * Returns error stack as JSON.
     *
     * @return {Promise}
     */
    public async toJSON(): Promise<object> {
        return new Promise((resolve, reject) => {
            this.errorParser.parse().then((stack) => {
                resolve({
                    error: this.errorParser.serialize(stack),
                });
            }).catch(reject);
        });
    }

    /**
     * Returns HTML representation of the error stack
     * by parsing the stack into frames and getting
     * important info out of it.
     *
     * @return {Promise}
     */
    public async toHTML(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.errorParser.parse().then((stack) => {
                const data = this.errorParser.serialize(stack, (frame, index) => {
                    const serializedFrame = FrameParser.serializeCodeFrame(frame);
                    serializedFrame.classes = this.getDisplayClasses(frame, index);
                    return serializedFrame;
                });

                resolve(this.complieView(this.viewTemplate, data));
            }).catch(reject);
        });
    }
    /**
     * Returns classes to be used inside HTML when
     * displaying the frames list.
     *
     * @param  {Object}
     * @param  {Number}
     *
     * @return {String}
     */
    private getDisplayClasses(frame, index): string {
        const classes = [];
        if (index === 0) {
            classes.push('active');
        }

        if (!FrameParser.isApp(frame)) {
            classes.push('native-frame');
        }
        return classes.join(' ');
    }

    /**
     * Compiles the view using HTML
     *
     * @param  {String}
     * @param  {Object}
     *
     * @return {String}
     */
    private complieView(view, data): string {
        return Mustache.render(view, data);
    }
}
