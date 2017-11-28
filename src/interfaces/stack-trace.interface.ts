export interface IStackTrace {
    context: {
        pre: any;
        post: any;
        line: any;
    };
    get(belowFn?: any);
    parse(err);
    getTypeName();
    getFunctionName();
    getMethodName();
    getFileName();
    getLineNumber();
    getColumnNumber();
    isNative();
}
