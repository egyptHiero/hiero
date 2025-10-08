import {
  ParamIdFilterDto as ParamIdFilterSchema,
  SignDto as SignDtoSchema,
  SignNewDto as SignNewDtoSchema,
} from '../../generated/typebox';
import { toIdentifiableDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const putSign = (fastify: FastifyTypeBox) =>
  fastify.put(
    '/api/sign/:id',
    {
      schema: {
        description: 'update sign',
        tags: ['sign'],
        summary: 'update sign',
        params: ParamIdFilterSchema,
        body: SignNewDtoSchema,
        response: {
          200: SignDtoSchema,
        },
      },
    },
    async function (request) {
      const { id } = request.params;
      const sign = request.body;
      const signs = fastify.db.getSigns();

      return signs
        .put(id, sign)
        .then(async () => toIdentifiableDto(id, await signs.get(id)));
    },
  );
