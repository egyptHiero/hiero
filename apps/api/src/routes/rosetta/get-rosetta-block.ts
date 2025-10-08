import { FastifyTypeBox } from '../../types';
import {
  ParamIdFilterDto as ParamIdFilterSchema,
  RosettaBlocksDto as RosettaDtoSchema,
} from '../../generated/typebox';
import { toIdentifiableDto } from '../../dto';

export const getRosettaBlock = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/rosetta/block/:id',
    {
      schema: {
        description: 'get particular rosetta block',
        tags: ['rosetta'],
        summary: 'get particular rosetta block',
        params: ParamIdFilterSchema,
        response: {
          200: RosettaDtoSchema,
          404: { $ref: 'HttpError' },
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;

      const entity = await fastify.db.getRosettaBlocks().get(id);

      if (!entity) {
        return reply.notFound();
      }

      const entityParts = await fastify.db.getRosetta().getMany(entity.parts);
      const parts = entityParts.map((part, n) =>
        toIdentifiableDto(entity.parts[n], part),
      );

      return toIdentifiableDto(id, { ...entity, parts });
    },
  );
