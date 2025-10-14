import {
  ParamIdFilterDto as ParamIdFilterSchema,
  RosettaBlockBody as RosettaBlockBodySchema,
  RosettaBlocksDto as RosettaBlockDtoSchema,
} from '../../generated/typebox';
import { toIdentifiableDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const putRosettaBlock = (fastify: FastifyTypeBox) =>
  fastify.put(
    '/api/rosetta/:id/block',
    {
      schema: {
        description: 'update rosetta block',
        tags: ['rosetta'],
        summary: 'update rosetta block',
        params: ParamIdFilterSchema,
        body: RosettaBlockBodySchema,
        response: {
          200: RosettaBlockDtoSchema,
          404: { $ref: 'HttpError' },
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;

      const table = fastify.db.getRosettaBlocks();
      const block = await table.get(id);
      if (!block) {
        return reply.notFound();
      }

      block.images = request.body.images;

      await table.put(id, block);
      const entity = await table.get(id);
      const entityParts = await fastify.db.getRosetta().getMany(entity.parts);
      const parts = entityParts.map((part, n) =>
        toIdentifiableDto(entity.parts[n], part),
      );

      return toIdentifiableDto(id, { ...entity, parts });
    },
  );
