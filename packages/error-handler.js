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
const Mustache = require("mustache");
const path = require("path");
const error_parser_1 = require("./parser/error-parser");
const frame_parser_1 = require("./parser/frame-parser");
class ErrorHandler {
    constructor(error, options) {
        this.VIEW_PATH = './themes/error.default.mustache';
        this.viewTemplate = fs.readFileSync(path.join(__dirname, this.VIEW_PATH), 'utf-8');
        this.error = error;
        if (options.theme) {
            this.VIEW_PATH = `./themes/error.${options.theme}.mustache`;
            this.viewTemplate = fs.readFileSync(path.join(__dirname, this.VIEW_PATH), 'utf-8');
        }
        this.errorParser = new error_parser_1.ErrorParser(error, options);
    }
    /**
     * Returns error stack as JSON.
     *
     * @return {Promise}
     */
    toJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.errorParser.parse().then((stack) => {
                    resolve({
                        error: this.errorParser.serialize(stack),
                    });
                }).catch(reject);
            });
        });
    }
    /**
     * Returns HTML representation of the error stack
     * by parsing the stack into frames and getting
     * important info out of it.
     *
     * @return {Promise}
     */
    toHTML() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.errorParser.parse().then((stack) => {
                    const data = this.errorParser.serialize(stack, (frame, index) => {
                        const serializedFrame = frame_parser_1.FrameParser.serializeCodeFrame(frame);
                        serializedFrame.classes = this.getDisplayClasses(frame, index);
                        return serializedFrame;
                    });
                    resolve(this.complieView(this.viewTemplate, data));
                }).catch(reject);
            });
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
    getDisplayClasses(frame, index) {
        const classes = [];
        if (index === 0) {
            classes.push('active');
        }
        if (!frame_parser_1.FrameParser.isApp(frame)) {
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
    complieView(view, data) {
        return Mustache.render(view, data);
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error-handler.js.map