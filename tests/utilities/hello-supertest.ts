import type { FastifyInstance } from 'fastify';
import supertest from 'supertest';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { name } from '../../fixtures/utilities/hello';
import build from '../../src/app';
import { goodbyeResponse } from '../../src/utilities/hello';

let app: FastifyInstance;

test.before(async () => {
  app = await build();
});

test.before.each((meta) => {
  console.log(meta['__test__']);
});

test('goodbyeResponse', () => {
  assert.type(goodbyeResponse, 'function');
  assert.is(goodbyeResponse(name), 'So long Matthew!');
});

test('it sends expected response to hello query', async () => {
  const query = `
    query Query {
      hello
    }
  `;

  await app.ready();

  const response = await supertest(app.server)
    .post('/graphql')
    .send({ query, variables: {} })
    .set('Content-Type', 'application/json')
    .expect(200);

  const { body } = response;
  assert.snapshot(JSON.stringify(body), '{"data":{"hello":"Hello everybody!"}}');
  assert.is(body.data.hello, 'Hello everybody!');
});

test('it sends expected response to goodbye query', async () => {
  const query = `
    query Query($goodbyeName: String!) {
      goodbye(name: $goodbyeName)
    }
  `;
  const variables = { goodbyeName: name };

  await app.ready();

  const response = await supertest(app.server)
    .post('/graphql')
    .send({ query, variables })
    .set('Content-Type', 'application/json')
    .expect(200);

  const { body } = response;
  assert.snapshot(JSON.stringify(body), '{"data":{"goodbye":"So long Matthew!"}}');
  assert.is(body.data.goodbye, 'So long Matthew!');
});

test.run();
