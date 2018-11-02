import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, UseFilters, INestApplication } from '@nestjs/common';
import { FlubErrorHandler } from './../flub-error-handler';
import * as request from 'supertest';

let flubModule: TestingModule;
let app: INestApplication;

@Controller('test')
@UseFilters(new FlubErrorHandler())
class TestController {
  @Get('')
  testMe() {
    return 'test';
    throw new Error('standard error');
  }

  @Get('no')
  noError() {
    return { success: true };
  }
}

beforeAll(async () => {
  flubModule = await Test.createTestingModule({
    controllers: [TestController],
  }).compile();

  app = flubModule.createNestApplication();
  await app.init();
});

describe('FlubErrorHandler', () => {
  it('No Error', async () => {
    return await request(app.getHttpServer())
      .get('/test/no')
      .set('Accept', 'application/json')
      .expect(200, { success: true })
      .expect('Content-Type', /json/);
  });
});

afterAll(async () => {
  await app.close();
});
