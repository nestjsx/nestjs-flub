import * as fs from 'fs';
import * as Mustache from 'mustache';
import * as path from 'path';
import { DefaultFlubOptions } from './default-flub-options';
import { FlubOptions } from './interfaces';
import { ErrorParser, FrameParser } from './parser';

export class ErrorHandler {
  private error: Error;
  private options: FlubOptions;
  private readonly errorParser: ErrorParser;

  constructor(error: Error, options: FlubOptions = new DefaultFlubOptions()) {
    this.error = error;
    this.options = options;
    this.errorParser = new ErrorParser(error, options);
  }

  /**
   * Returns error stack as JSON.
   *
   * @return {Promise}
   */
  public async toJSON(): Promise<object> {
    return new Promise((resolve, reject) => {
      this.errorParser
        .parse()
        .then(async stack => {
          resolve({
            error: await this.errorParser.serialize(stack),
          });
        })
        .catch(reject);
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
      this.errorParser
        .parse()
        .then(async stack => {
          const data = await this.errorParser.serialize(
            stack,
            async (frame, index) => {
              const serializedFrame = await FrameParser.serializeCodeFrame(
                frame,
              );
              serializedFrame.classes = this.getDisplayClasses(frame, index);
              return serializedFrame;
            },
          );
          const viewTemplate = fs.readFileSync(
            path.join(
              __dirname,
              `./themes/error.${this.options.theme || 'default'}.mustache`,
            ),
            'utf-8',
          );
          resolve(this.complieView(viewTemplate, data));
        })
        .catch(reject);
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
