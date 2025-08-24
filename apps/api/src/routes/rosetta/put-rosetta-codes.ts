import {
  ParamIdFilterDto as ParamIdFilterSchema,
  RosettaPartCodesDto as RosettaPartCodesDtoSchema,
  RosettaPartDto as RosettaPartDtoSchema,
} from '../../generated/typebox';
import { toRosettaPartDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const putRosettaCodes = (fastify: FastifyTypeBox) =>
  fastify.put(
    '/api/rosetta/:id/codes',
    {
      schema: {
        description: 'update rosetta',
        tags: ['rosetta'],
        summary: 'update rosetta',
        params: ParamIdFilterSchema,
        body: RosettaPartCodesDtoSchema,
        response: {
          200: RosettaPartDtoSchema,
          404: { $ref: 'HttpError' },
        },
      },
    },
    async function (request, reply) {
      const { id } = request.params;

      const part = await fastify.db.getRosetta().get(id);
      if (!part) {
        return reply.notFound();
      }

      part.gardinerCodes = request.body.codes;

      return fastify.db
        .getRosetta()
        .put(id, part)
        .then(async () => toRosettaPartDto(id, part));
    },
  );
