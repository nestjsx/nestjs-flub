import { Context, StackTraceInterface } from './../interfaces';

export class SyntheticStackTrace implements StackTraceInterface {
  context: Context;
  frame: StackTraceInterface;
  originalSourceData: any;
  
  constructor(frame, originalSourceData) {
    this.frame = frame;
    this.originalSourceData = originalSourceData;
  }

  get(belowFn?: any) { return this.frame.get(belowFn); }
  parse(err) { return this.frame.parse(err); }
  getTypeName() { return this.frame.getTypeName(); }
  getFunctionName() { return this.frame.getFunctionName(); }
  getMethodName() { return this.frame.getMethodName(); }
  getFileName() { return this.originalSourceData.source.substring(1); }
  getLineNumber() { return this.originalSourceData.line; }
  getColumnNumber() { return this.originalSourceData.column; }
  isNative() { return this.frame.isNative(); }
}
