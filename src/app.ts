import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import Fastify from 'fastify';
import mercurius from 'mercurius';
import { schema } from './schema';

let app: FastifyInstance | null = null;

async function build(options: FastifyServerOptions = { logger: true }) {
	try {
		app = Fastify(options);
		app.get('/', async function (_req, reply) {
			return reply.graphql('{}');
		});

		await app.register(mercurius, {
			schema,
			subscription: true,
			graphiql: true,
		});

		return app;
	} catch (err) {
		if (app) app.log.error(err);
		process.exit(1);
	}
}

export default build;
