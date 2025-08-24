import { registerDictionaryRoutes } from './dictionary';
import { registerSignRoutes } from './sign';
import { registerHieroglyphs } from './hieroglyph';
import { FastifyTypeBox } from '../types';
import { registerTranslationRoutes } from './translation';
import { registerRosettaRoutes } from './rosetta';

export default async function routes(fastify: FastifyTypeBox) {
  registerDictionaryRoutes(fastify);
  registerSignRoutes(fastify);
  registerTranslationRoutes(fastify);
  registerHieroglyphs(fastify);
  registerRosettaRoutes(fastify);

  fastify.get('/', (_request, reply) => reply.status(200).send('Ok'));
}
