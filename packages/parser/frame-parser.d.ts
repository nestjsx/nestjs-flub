import { IFrame } from '../interfaces/frame.interface';
import { IStackTrace } from '../interfaces/stack-trace.interface';
export declare class FrameParser {
    static codeContext: number;
    /**
     * Returns the source code for a given file. If unable to
     * read file it log a warn and resolves the promise with a null.
     *
     * @param  {Object} frame
     * @return {Promise} null || Object
     */
    static readCodeFrame(frame: IStackTrace): Promise<object>;
    /**
     * Serializes frame to a usable as an error object.
     *
     * @param  {Object} frame
     *
     * @return {Object}
     */
    static serializeCodeFrame(frame: IStackTrace): IFrame;
    /**
     * Serializes frame to a usable as an error object.
     *
     * @param  {Object} frame
     *
     * @return {Object}
     */
    static frameContext(frame: IStackTrace): object;
    /**
     * Returns whether frame belongs to nodejs
     * or not.
     *
     * @return {Boolean} [description]
     */
    static isNode(frame: any): boolean;
    /**
     * Returns whether code belongs to the app
     * or not.
     *
     * @return {Boolean} [description]
     */
    static isApp(frame: any): boolean;
}
