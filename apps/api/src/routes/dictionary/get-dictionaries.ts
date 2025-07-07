import {
  DictionaryInfoDto as DictionaryInfoSchema,
  DictionaryListFilterDto as DictionaryListFilterSchema,
  PageDto as PageSchema,
} from '../../typebox';
import {toDictionaryInfoDto, toPageDto} from '../../dto';
import {DB, DbUtils} from '@hiero/db';
import {TypeBoxTypeProvider} from "@fastify/type-provider-typebox";
import {FastifyTypeBox} from "../../types";

export const getDictionaries = (fastify: FastifyTypeBox, db: DB) =>
  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/api/dictionary',
    {
      schema: {
        description: 'returns a list of all the available dictionaries',
        tags: ['dictionary'],
        summary: 'get available dictionaries',
        querystring: DictionaryListFilterSchema,
        response: {
          200: PageSchema(DictionaryInfoSchema),
        },
      },
    },
    async function (request) {
      const {from, pageSize} = request.query;

      return toPageDto(
        await DbUtils.getPage(db.getDictionaryInfo(), {
          from,
          pageSize,
          mapper: toDictionaryInfoDto,
        })
      );
    }
  );
