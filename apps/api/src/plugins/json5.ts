import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import json5 from 'fastify-json5';

/**
 * This plugin enable your server to process JSON5 payloads.
 *
 * @see https://github.com/Eomm/fastify-json5
 */
export default fp(async function (fastify: FastifyInstance) {
  fastify.register(json5, {});
});
