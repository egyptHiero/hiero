import {createDbInstance} from '@hiero/db';
import {registerDictionaryRoutes} from './dictionary';
import {registerSignRoutes} from './sign';
import {registerHieroglyphs} from './hieroglyph';
import {FastifyTypeBox} from "../types";

export default async function routes(fastify: FastifyTypeBox) {
  const db = await createDbInstance();

  registerDictionaryRoutes(fastify, db);
  registerSignRoutes(fastify, db);
  registerHieroglyphs(fastify, db);

  fastify.get('/', (_request, reply) => reply.status(200).send('Ok'));
}
