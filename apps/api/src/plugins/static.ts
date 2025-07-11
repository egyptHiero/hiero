import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import statics from '@fastify/static';
import * as path from "node:path";

/**
 * This plugin serves static files.
 *
 * @see https://github.com/fastify/fastify-static
 */
export default fp(async function (fastify: FastifyInstance) {
  fastify.register(statics, {
    root: path.join(__dirname, '../../../../locales'),
    prefix: '/locales',
    decorateReply: false,
  });

});
