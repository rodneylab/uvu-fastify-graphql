import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { name } from '../../fixtures/utilities/hello';
import { goodbyeResponse } from '../../src/utilities/hello';

test.before.each((meta) => {
  console.log(meta['__test__']);
});

test('it returns expected response from goodbyeResponse', () => {
  assert.type(goodbyeResponse, 'function');
  assert.is(goodbyeResponse(name), 'So long Matthew!');
});

test.run();
