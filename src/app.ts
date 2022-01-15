import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import Fastify, { FastifyInstance } from 'fastify';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import HelloResolver from './resolvers/hello';

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

export async function build(opts = {}): Promise<FastifyInstance> {
  const app: FastifyInstance = Fastify(opts);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
    context: ({ request, reply }) => ({
      request,
      reply,
    }),
  });
  await apolloServer.start();
  app.register(apolloServer.createHandler());

  return app;
}

// startApolloServer();

export { build as default };
