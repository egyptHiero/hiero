import { ParamIdFilterDto as ParamIdFilterSchema } from '../../generated/typebox';
import { FastifyTypeBox } from '../../types';
import { Type } from '@sinclair/typebox';

export const deleteSign = (fastify: FastifyTypeBox) =>
  fastify.delete(
    '/api/sign/:id',
    {
      schema: {
        description: 'delete sign',
        tags: ['sign'],
        summary: 'delete sign',
        params: ParamIdFilterSchema,
        response: {
          200: Type.Null(),
        },
      },
    },
    async function (request) {
      const { id } = request.params;
      const signs = fastify.db.getSigns();

      return signs.del(id);
    },
  );
