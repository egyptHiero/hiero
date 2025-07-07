import {DB, DbUtils} from '@hiero/db';
import {
  DictionaryListFilterDto as DictionaryListFilterSchema,
  SignDto as SignDtoSchema,
  SignNewDto as SignNewDtoSchema,
} from '../../typebox';
import {toSignDto} from '../../dto';
import {FastifyTypeBox} from "../../types";

export const postSign = (fastify: FastifyTypeBox, db: DB) =>
  fastify.post<{
    Body: SignNewDtoSchema;
  }>(
    '/api/sign',
    {
      schema: {
        description: 'create new sign',
        tags: ['sign'],
        summary: 'create new sign',
        querystring: DictionaryListFilterSchema,
        body: SignNewDtoSchema,
        response: {
          200: SignDtoSchema,
        },
      },
    },
    async function (request) {
      const signs = db.getSigns();
      const id = await DbUtils.getUniqueId(signs);
      const sign = request.body;

      return signs
        .put(id, sign)
        .then(async () => toSignDto(id, await signs.get(id)));
    }
  );
