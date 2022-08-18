import type { FastifyInstance } from 'fastify';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { name } from '../../fixtures/utilities/hello';
import build from '../../src/app';

let app: FastifyInstance;

test.before(async () => {
  app = await build();
});

test.before.each((meta) => {
  console.log(meta['__test__']);
});

test.after(() => app.close());

test('it sends expected response to hello query', async () => {
    const query = `
    query Query {
      hello
    }
  `;

    const response = await app.inject({
      method: 'POST',
      url: '/graphql',
      headers: { 'content-type': 'application/json' },
      payload: { query, variables: {} },
    });

    const json = await response.json();
    assert.snapshot(JSON.stringify(json), '{"data":{"hello":"Hello everybody!"}}');
    assert.is(json.data.hello, 'Hello everybody!');
});

test('it sends expected response to goodbye query', async () => {
    const query = `
    query Query($goodbyeName: String!) {
      goodbye(name: $goodbyeName)
    }
  `;
    const variables = { goodbyeName: name };

    await app.ready();

    const response = await app.inject({
      method: 'POST',
      url: '/graphql',
      headers: { 'content-type': 'application/json' },
      payload: { query, variables },
    });
    const json = await response.json();
    assert.snapshot(JSON.stringify(json), '{"data":{"goodbye":"So long Matthew!"}}');
    assert.is(json.data.goodbye, 'So long Matthew!');
});

test.run();
