
const now: any = new Date(new Date().getTime()).toLocaleString();
export class Logger {
    public static error(from: any, message: any) {
        return from ?
            console.error(`[${now}] WARN: ${from} => ${message} `)
            : console.error(`[${now}] WARN: ${message} `);
    }

    public static warn(from: any, message: any) {
        return from ?
            console.warn(`[${now}] WARN: ${from} => ${message} `)
            : console.warn(`[${now}] WARN: ${message} `);
    }

}
