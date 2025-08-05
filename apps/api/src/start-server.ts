import { app } from './app';
import process from 'node:process';
import Fastify from 'fastify';
import { createDbInstance } from '@hiero/db';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

/**
 * Starts fastify server at server and port from .env.
 */
export const startServer = async () => {
  const db = await createDbInstance();
  server.decorate('db', db);
  server.register(app, db);

  // Start listening.
  server.listen({ port, host }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    } else {
      console.log(`[ ready ] http://${host}:${port}`);
    }
  });

  await server.ready();
  console.log(JSON.stringify(server.swagger, null, 2));
};
