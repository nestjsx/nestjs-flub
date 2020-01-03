import { Context, StackTraceInterface } from './../interfaces';

export class SyntheticStackTrace implements StackTraceInterface {
  context: Context;
  frame: StackTraceInterface;
  originalSourceData: any;

  constructor(frame, originalSourceData) {
    this.frame = frame;
    this.originalSourceData = originalSourceData;
  }

  get(belowFn?: any) {
    return this.frame.get(belowFn);
  }
  parse(err) {
    return this.frame.parse(err);
  }
  getTypeName() {
    return this.frame.getTypeName();
  }
  getFunctionName() {
    return this.frame.getFunctionName();
  }
  getMethodName() {
    return this.frame.getMethodName();
  }
  getFileName() {
    const source = this.originalSourceData.source;
    return source ? source.substring(1) : '<unknown>';
  }
  getLineNumber() {
    return this.originalSourceData.line;
  }
  getColumnNumber() {
    return this.originalSourceData.column;
  }
  isNative() {
    return this.frame.isNative();
  }
}
