import {
  DictionaryInfoDto as DictionaryInfoSchema,
  ParamIdFilterDto as ParamIdFilterSchema,
} from '../../generated/typebox';
import { toIdentifiableDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

export const getDictionaryInfo = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/dictionary-info/:id',
    {
      schema: {
        description: 'returns particular dictionary information',
        tags: ['dictionary', 'info'],
        summary: 'get dictionary info',
        params: ParamIdFilterSchema,
        response: {
          200: DictionaryInfoSchema,
        },
      },
    },
    async function (request) {
      const { id } = request.params;

      return toIdentifiableDto(
        id,
        await fastify.db.getDictionaryInfo().get(id),
      );
    },
  );
