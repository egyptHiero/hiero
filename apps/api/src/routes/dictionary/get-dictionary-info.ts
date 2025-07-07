import {DictionaryInfoDto as DictionaryInfoSchema, ParamIdFilterDto as ParamIdFilterSchema,} from '../../typebox';
import {toDictionaryInfoDto} from '../../dto/utils';
import {DB} from '@hiero/db';
import {FastifyTypeBox} from "../../types";

export const getDictionaryInfo = (fastify: FastifyTypeBox, db: DB) =>
  fastify.get(
    '/api/dictionary-info/:id',
    {
      schema: {
        description: 'returns particular dictionary information',
        tags: ['dictionary'],
        summary: 'get dictionary info',
        params: ParamIdFilterSchema,
        response: {
          200: DictionaryInfoSchema,
        },
      },
    },
    async function (request) {
      const {id} = request.params;

      return toDictionaryInfoDto(id, await db.getDictionaryInfo().get(id));
    }
  );
