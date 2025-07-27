import { DB } from '@hiero/db';
import { ParamIdFilterDto as ParamIdFilterSchema } from '../../generated/typebox';
import { ParamIdFilterDto } from '../../dto';
import { FastifyTypeBox } from '../../types';
import { Type } from '@sinclair/typebox';

export const deleteSign = (fastify: FastifyTypeBox, db: DB) =>
  fastify.delete<{
    Params: ParamIdFilterDto;
  }>(
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
      const signs = db.getSigns();

      return signs.del(id);
    },
  );
