export interface Context {
  pre: any;
  post: any;
  line: any;
}

export interface StackTraceInterface {
  context: Context;
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
