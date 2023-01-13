import { FastifyInstance, LightMyRequestResponse } from 'fastify';
import { test } from 'uvu';
import build from './src/app';

interface TestContext {
	request: (
		query: string,
		variables?: Record<string, string | number>,
	) => Promise<LightMyRequestResponse | undefined>;
}

export function createTestContext(): TestContext {
	const ctx = {} as TestContext;
	let serverInstance: FastifyInstance | null = null;
	test.before(async () => {
		serverInstance = await build({ logger: false });
	});

	test.before.each(async (meta) => {
		console.log(meta.__test__);

		async function request(query: string, variables = {} as Record<string, string>) {
			return serverInstance?.inject({
				method: 'POST',
				url: 'graphql',
				headers: { 'content-type': 'application/json' },
				payload: { query, variables },
			});
		}

		Object.assign(ctx, { request });
	});

	test.after(() => serverInstance?.close());

	return ctx;
}
