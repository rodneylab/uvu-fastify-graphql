import { test } from 'uvu';
import { is, ok, snapshot } from 'uvu/assert';
import { name } from '../../fixtures/utilities/hello';
import { createTestContext } from '../../testHelpers';

const ctx = createTestContext();

test('it sends expected response to hello query', async () => {
	const query = `
    query Query {
      hello
    }
  `;

	const response = await ctx.request(query);
	ok(response);

	const { data }: { data: { hello: string } } = await response.json();
	snapshot(JSON.stringify(data), '{"hello":"Hello everybody!"}');

	const { hello } = data;
	is(hello, 'Hello everybody!');
});

test('it sends expected response to goodbye query', async () => {
	const query = `
    query Query($goodbyeName: String!) {
      goodbye(name: $goodbyeName)
    }
  `;
	const variables = { goodbyeName: name };

	const response = await ctx.request(query, variables);
	ok(response);

	const { data }: { data: { goodbye: string } } = await response.json();
	snapshot(JSON.stringify(data), '{"goodbye":"So long Matthew!"}');

	const { goodbye } = data;
	is(goodbye, 'So long Matthew!');
});

test.run();
