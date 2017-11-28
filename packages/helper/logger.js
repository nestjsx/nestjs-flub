"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const now = new Date(new Date().getTime()).toLocaleString();
class Logger {
    static error(from, message) {
        return from ?
            console.error(`[${now}] WARN: ${from} => ${message} `)
            : console.error(`[${now}] WARN: ${message} `);
    }
    static warn(from, message) {
        return from ?
            console.warn(`[${now}] WARN: ${from} => ${message} `)
            : console.warn(`[${now}] WARN: ${message} `);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map