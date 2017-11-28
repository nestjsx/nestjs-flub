export interface IStackTrace {
    context: {
        pre: any;
        post: any;
        line: any;
    };
    get(belowFn?: any): any;
    parse(err: any): any;
    getTypeName(): any;
    getFunctionName(): any;
    getMethodName(): any;
    getFileName(): any;
    getLineNumber(): any;
    getColumnNumber(): any;
    isNative(): any;
}
