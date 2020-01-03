import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, UseFilters, INestApplication } from '@nestjs/common';
import { FlubErrorHandler } from './../flub-error-handler';
import * as request from 'supertest';
const fs = require('fs');

let flubModule: TestingModule;
let app: INestApplication;

@Controller('test')
@UseFilters(new FlubErrorHandler({ sourcemap: true }))
class TestController {
  @Get('')
  testMe() {
    throw new Error('standard error');
  }

  @Get('no')
  noError() {
    return { success: true };
  }
}

beforeAll(async () => {
  fs.writeFileSync(
    '/Users/mtolmacs/Projects/nestjs-flub/src/__tests__/flub-error-handler-e2e-spec.ts.map',
    '{"version":3,"file":"flub-error-handler-e2e-spec.js","sourceRoot":"","sources":["../../src/__tests__/flub-error-handler-e2e-spec.ts"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;AAAA,6CAAsD;AACtD,2CAA+E;AAC/E,gEAA2D;AAC3D,qCAAqC;AAErC,IAAI,UAAyB,CAAC;AAC9B,IAAI,GAAqB,CAAC;AAI1B,IAAM,cAAc,GAApB,MAAM,cAAc;IAElB,MAAM;QACJ,OAAO,MAAM,CAAC;QACd,MAAM,IAAI,KAAK,CAAC,gBAAgB,CAAC,CAAC;IACpC,CAAC;IAGD,OAAO;QACL,OAAO,EAAE,OAAO,EAAE,IAAI,EAAE,CAAC;IAC3B,CAAC;CACF,CAAA;AATC;IADC,YAAG,CAAC,EAAE,CAAC;;;;4CAIP;AAGD;IADC,YAAG,CAAC,IAAI,CAAC;;;;6CAGT;AAVG,cAAc;IAFnB,mBAAU,CAAC,MAAM,CAAC;IAClB,mBAAU,CAAC,IAAI,qCAAgB,CAAC,EAAE,SAAS,EAAE,IAAI,EAAE,CAAC,CAAC;GAChD,cAAc,CAWnB;AAED,SAAS,CAAC,GAAS,EAAE;IACnB,UAAU,GAAG,MAAM,cAAI,CAAC,mBAAmB,CAAC;QAC1C,WAAW,EAAE,CAAC,cAAc,CAAC;KAC9B,CAAC,CAAC,OAAO,EAAE,CAAC;IAEb,GAAG,GAAG,UAAU,CAAC,qBAAqB,EAAE,CAAC;IACzC,MAAM,GAAG,CAAC,IAAI,EAAE,CAAC;AACnB,CAAC,CAAA,CAAC,CAAC;AAEH,QAAQ,CAAC,kBAAkB,EAAE,GAAG,EAAE;IAChC,EAAE,CAAC,UAAU,EAAE,GAAS,EAAE;QACxB,OAAO,MAAM,OAAO,CAAC,GAAG,CAAC,aAAa,EAAE,CAAC;aACtC,GAAG,CAAC,UAAU,CAAC;aACf,GAAG,CAAC,QAAQ,EAAE,kBAAkB,CAAC;aACjC,MAAM,CAAC,GAAG,EAAE,EAAE,OAAO,EAAE,IAAI,EAAE,CAAC;aAC9B,MAAM,CAAC,cAAc,EAAE,MAAM,CAAC,CAAC;IACpC,CAAC,CAAA,CAAC,CAAC;AACL,CAAC,CAAC,CAAC;AAEH,QAAQ,CAAC,GAAS,EAAE;IAClB,MAAM,GAAG,CAAC,KAAK,EAAE,CAAC;AACpB,CAAC,CAAA,CAAC,CAAC"}',
  );
  fs.writeFileSync(
    '/Users/mtolmacs/Projects/nestjs-flub/src/__tests__/error-handler.spec.ts.map',
    '{"version":3,"file":"error-handler.spec.js","sourceRoot":"","sources":["../../src/__tests__/error-handler.spec.ts"],"names":[],"mappings":";;;;;;;;;;;AAAA,sDAAkD;AAElD,QAAQ,CAAC,cAAc,EAAE,GAAG,EAAE;IAC5B,EAAE,CAAC,iBAAiB,EAAE,GAAG,EAAE;QACzB,MAAM,YAAY,GAAG,IAAI,4BAAY,CAAC,IAAI,KAAK,CAAC,qBAAqB,CAAC,EAAE;YACtE,KAAK,EAAE,MAAM;YACb,KAAK,EAAE,KAAK;YACZ,SAAS,EAAE,IAAI;SAChB,CAAC,CAAC;QAEH,MAAM,CAAC,YAAY,CAAC,CAAC,cAAc,CAAC,4BAAY,CAAC,CAAC;IACpD,CAAC,CAAC,CAAC;IAEH,EAAE,CAAC,iCAAiC,EAAE,GAAG,EAAE;QACzC,MAAM,YAAY,GAAG,IAAI,4BAAY,CAAC,IAAI,KAAK,CAAC,qBAAqB,CAAC,CAAC,CAAC;QAExE,MAAM,CAAC,YAAY,CAAC,CAAC,cAAc,CAAC,4BAAY,CAAC,CAAC;IACpD,CAAC,CAAC,CAAC;IAEH,EAAE,CAAC,iCAAiC,EAAE,GAAS,EAAE;QAC/C,MAAM,YAAY,GAAG,IAAI,4BAAY,CAAC,IAAI,KAAK,CAAC,sBAAsB,CAAC,EAAE;YACvE,KAAK,EAAE,MAAM;YACb,KAAK,EAAE,KAAK;YACZ,SAAS,EAAE,KAAK;SACjB,CAAC,CAAC;QAEH,MAAM,MAAM,GAAQ,MAAM,YAAY,CAAC,MAAM,EAAE,CAAC;QAEhD,MAAM,CAAC,OAAO,MAAM,CAAC,CAAC,IAAI,CAAC,QAAQ,CAAC,CAAC;QACrC,MAAM,CAAC,MAAM,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,sBAAsB,CAAC,CAAC;IAC5D,CAAC,CAAA,CAAC,CAAC;IAEH,EAAE,CAAC,iCAAiC,EAAE,GAAS,EAAE;QAC/C,MAAM,YAAY,GAAG,IAAI,4BAAY,CAAC,IAAI,KAAK,CAAC,mBAAmB,CAAC,EAAE;YACpE,KAAK,EAAE,MAAM;YACb,KAAK,EAAE,KAAK;YACZ,SAAS,EAAE,IAAI;SAChB,CAAC,CAAC;QAEH,MAAM,IAAI,GAAG,MAAM,YAAY,CAAC,MAAM,EAAE,CAAC;QAEzC,MAAM,CAAC,OAAO,IAAI,CAAC,CAAC,IAAI,CAAC,QAAQ,CAAC,CAAC;IACrC,CAAC,CAAA,CAAC,CAAC;AACL,CAAC,CAAC,CAAC"}',
  );

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

  it('Errors out', async () => {
    return await request(app.getHttpServer())
      .get('/test')
      .set('Accept', 'application/json')
      .expect(500)
      .expect('Content-Type', /text\/html/);
  });
});

afterAll(async () => {
  fs.unlinkSync(
    '/Users/mtolmacs/Projects/nestjs-flub/src/__tests__/flub-error-handler-e2e-spec.ts.map',
  );
  fs.unlinkSync(
    '/Users/mtolmacs/Projects/nestjs-flub/src/__tests__/error-handler.spec.ts.map',
  );

  await app.close();
});
