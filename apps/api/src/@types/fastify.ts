import { DB } from '@hiero/db';

declare module 'fastify' {
  interface FastifyInstance {
    db: DB;
  }
}
