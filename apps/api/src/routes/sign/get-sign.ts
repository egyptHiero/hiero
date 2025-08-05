import {
  ParamIdFilterDto as ParamIdFilterSchema,
  SignDto as SignDtoSchema,
} from '../../generated/typebox';
import { toSignDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const getSign = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/sign/:id',
    {
      schema: {
        description: 'get particular sign',
        tags: ['sign'],
        summary: 'get particular sign',
        params: ParamIdFilterSchema,
        response: {
          200: SignDtoSchema,
          404: { $ref: 'HttpError' },
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;

      const table = fastify.db.getSigns();
      const entity = await table.get(id);
      if (!entity) {
        return reply.notFound();
      }
      return toSignDto(id, entity);
    },
  );
