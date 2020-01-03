import { ErrorHandler } from './../error-handler';

describe('ErrorHandler', () => {
  it('Should instance', () => {
    const errorHandler = new ErrorHandler(new Error('hello I am an error'), {
      theme: 'dark',
      quote: false,
      sourcemap: true,
    });

    expect(errorHandler).toBeInstanceOf(ErrorHandler);
  });

  it('Should instance without options', () => {
    const errorHandler = new ErrorHandler(new Error('hello I am an error'));

    expect(errorHandler).toBeInstanceOf(ErrorHandler);
  });

  it('toJson should return valid json', async () => {
    const errorHandler = new ErrorHandler(new Error('hello, another error'), {
      theme: 'dark',
      quote: false,
      sourcemap: false,
    });

    const result: any = await errorHandler.toJSON();

    expect(typeof result).toBe('object');
    expect(result.error.message).toBe('hello, another error');
  });

  it('toHtml should return valid html', async () => {
    const errorHandler = new ErrorHandler(new Error('hello, error here'), {
      theme: 'dark',
      quote: false,
      sourcemap: true,
    });

    const html = await errorHandler.toHTML();

    expect(typeof html).toBe('string');
  });
});
