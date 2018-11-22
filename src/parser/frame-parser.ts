import * as fs from 'fs';
import * as path from 'path';
import { StackTraceInterface, FrameInterface } from './../interfaces';
import { Logger } from '@nestjs/common';

export class FrameParser {
  public static codeContext: number = 7;

  /**
   * Returns the source code for a given file. If unable to
   * read file it log a warn and resolves the promise with a null.
   *
   * @param  {Object} frame
   * @return {Promise} null || Object
   */
  public static async readCodeFrame(
    frame: StackTraceInterface,
  ): Promise<object> {
    return new Promise((resolve, reject) => {
      fs.readFile(frame.getFileName(), 'utf-8', (error, contents) => {
        if (error) {
          Logger.warn(
            `Nest Flub`,
            `Cannot Read File: ${frame.getFileName()} , I'm sorry`,
          );
          resolve(null);
          return;
        }
        const lines = contents.split(/\r?\n/);
        const lineNumber = frame.getLineNumber();
        resolve({
          line: lines[lineNumber - 1],
          post: lines.slice(lineNumber, lineNumber + FrameParser.codeContext),
          pre: lines.slice(
            Math.max(0, lineNumber - (FrameParser.codeContext + 1)),
            lineNumber - 1,
          ),
        });
      });
    });
  }

  /**
   * Serializes frame to a usable as an error object.
   *
   * @param  {Object} frame
   *
   * @return {Object}
   */
  public static serializeCodeFrame(frame: StackTraceInterface): FrameInterface {
    let relativeFileName = frame.getFileName().indexOf(process.cwd());
    if (relativeFileName > -1) {
      relativeFileName = frame
        .getFileName()
        .replace(process.cwd(), '')
        .replace(/\\|\//, '');
    } else {
      relativeFileName = frame.getFileName();
    }

    return {
      classes: '',
      column: frame.getColumnNumber(),
      context: FrameParser.frameContext(frame),
      file: relativeFileName,
      line: frame.getLineNumber(),
      method: frame.getFunctionName(),
    };
  }
  /**
   * Serializes frame to a usable as an error object.
   *
   * @param  {Object} frame
   *
   * @return {Object}
   */
  public static frameContext(frame: StackTraceInterface): object {
    if (!frame.context) {
      return {};
    }
    return {
      line: frame.context.line,
      post: frame.context.post.join('\n'),
      pre: frame.context.pre.join('\n'),
      start: frame.getLineNumber() - (frame.context.pre || []).length,
    };
  }

  /**
   * Returns whether frame belongs to nodejs
   * or not.
   *
   * @return {Boolean} [description]
   */
  public static isNode(frame): boolean {
    if (frame.isNative()) {
      return true;
    }

    const filename = frame.getFileName() || '';
    return !path.isAbsolute(filename) && filename[0] !== '.';
  }

  /**
   * Returns whether code belongs to the app
   * or not.
   *
   * @return {Boolean} [description]
   */
  public static isApp(frame): boolean {
    if (FrameParser.isNode(frame)) {
      return false;
    }
    return !~(frame.getFileName() || '').indexOf('node_modules' + path.sep);
  }
}
