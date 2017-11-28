"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const logger_1 = require("../helper/logger");
class FrameParser {
    /**
     * Returns the source code for a given file. If unable to
     * read file it log a warn and resolves the promise with a null.
     *
     * @param  {Object} frame
     * @return {Promise} null || Object
     */
    static readCodeFrame(frame) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readFile(frame.getFileName(), 'utf-8', (error, contents) => {
                    if (error) {
                        logger_1.Logger.warn(`Nest Flub`, `Cannot Read File: ${frame.getFileName()} , I'm sorry`);
                        resolve(null);
                        return;
                    }
                    const lines = contents.split(/\r?\n/);
                    const lineNumber = frame.getLineNumber();
                    resolve({
                        line: lines[lineNumber - 1],
                        post: lines.slice(lineNumber, lineNumber + FrameParser.codeContext),
                        pre: lines.slice(Math.max(0, lineNumber - (FrameParser.codeContext + 1)), lineNumber - 1),
                    });
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
    static serializeCodeFrame(frame) {
        let relativeFileName = frame.getFileName().indexOf(process.cwd());
        if (relativeFileName > -1) {
            relativeFileName = frame.getFileName().replace(process.cwd(), '').replace(/\\|\//, '');
        }
        else {
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
    static frameContext(frame) {
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
    static isNode(frame) {
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
    static isApp(frame) {
        if (FrameParser.isNode(frame)) {
            return false;
        }
        return !~(frame.getFileName() || '').indexOf('node_modules' + path.sep);
    }
}
FrameParser.codeContext = 7;
exports.FrameParser = FrameParser;
//# sourceMappingURL=frame-parser.js.map