import fp from 'fastify-plugin';
import {FastifyInstance} from 'fastify';
import {fastifySwagger} from '@fastify/swagger';
import {fastifySwaggerUi} from '@fastify/swagger-ui';

export const isSwaggerEnabled = process.env['NODE_ENV'] === 'development';

export default fp(async function (fastify: FastifyInstance) {
  if (isSwaggerEnabled) {
    fastify.register(fastifySwagger, {
      openapi: {
        openapi: '3.0.0',
        info: {
          title: 'Test swagger',
          description: 'Testing the Fastify swagger API',
          version: '0.1.0',
        },
        servers: [
          {
            url: `https://localhost:3000`,
            description: 'Development server',
          },
        ],
        components: {
          securitySchemes: {
            apiKey: {
              type: 'apiKey',
              name: 'apiKey',
              in: 'header',
            },
          },
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here',
        },
      },
    });

    fastify.register(fastifySwaggerUi, {
      routePrefix: '/docs',
    });
  }
});
