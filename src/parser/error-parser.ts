import * as stackTrace from 'stack-trace';
import { FlubOptions } from '../interfaces';
import quotes from './../quotes';
import { FrameParser } from './frame-parser';

export class ErrorParser {
  public viewQuote: boolean = true;
  public resolveSourceMap: boolean = false;
  private readonly error: Error;

  constructor(error: Error, options: FlubOptions) {
    this.error = error;
    this.viewQuote = options.quote;
    this.resolveSourceMap = options.sourcemap;
  }

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
  public async serialize(stack: object, callback?): Promise<object> {
    callback = callback || FrameParser.serializeCodeFrame.bind(this);
    let frames = [];
    if (stack instanceof Array) {
      if (this.resolveSourceMap) {
        const resolvedStack = await Promise.all(
          stack.map(async frame => await FrameParser.resolveSourceMap(frame)),
        );
        frames = await Promise.all(
          resolvedStack.filter(frame => frame.getFileName()).map(callback),
        );
      } else {
        frames = await Promise.all(
          stack.filter(frame => frame.getFileName()).map(callback),
        );
      }
    }
    return {
      frames,
      message: this.error.message,
      name: this.error.name,
      quote: this.viewQuote ? this.randomQuote() : undefined,
      // status: this.error.status, //TODO what's status for?
    };
  }

  /**
   * Parses the error stack and returns serialized
   * frames out of it.
   *
   * @return {Promise<Object>}
   */
  public parse(): Promise<object> {
    return new Promise((resolve, reject) => {
      const stack = stackTrace.parse(this.error);
      Promise.all(
        stack.map(async frame => {
          if (FrameParser.isNode(frame)) {
            return Promise.resolve(frame);
          }
          const resolvedFrame = this.resolveSourceMap
            ? await FrameParser.resolveSourceMap(frame)
            : frame;
          return FrameParser.readCodeFrame(resolvedFrame).then(context => {
            resolvedFrame.context = context;
            return resolvedFrame;
          });
        }),
      )
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * @return string
   */
  private randomQuote(): string {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}
