import {
  ParamIdFilterDto as ParamIdFilterSchema,
  RosettaPartDto as RosettaDtoSchema,
} from '../../generated/typebox';
import { toIdentifiableDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const getRosettaPart = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/rosetta/part/:id',
    {
      schema: {
        description: 'get particular rosetta part',
        tags: ['rosetta'],
        summary: 'get particular rosetta part',
        params: ParamIdFilterSchema,
        response: {
          200: RosettaDtoSchema,
          404: { $ref: 'HttpError' },
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;

      const table = fastify.db.getRosetta();
      const entity = await table.get(id);
      if (!entity) {
        return reply.notFound();
      }
      return toIdentifiableDto(id, entity);
    },
  );
