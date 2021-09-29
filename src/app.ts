import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import 'dotenv/config';
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

  // const opts: RouteShorthandOptions = {
  //   schema: {
  //     response: {
  //       200: {
  //         type: 'object',
  //         properties: {
  //           pong: {
  //             type: 'string',
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

  // server.get('/ping', opts, async (_request, _reply) => {
  //   return { pong: 'it worked!' };
  // });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  await apolloServer.start();
  app.register(apolloServer.createHandler());
  // await server.listen(4000);
  // console.log(`Server ready at
  // http://localhost:4000${apolloServer.graphqlPath}`);

  return app;
}

// startApolloServer();

export { build as default };
