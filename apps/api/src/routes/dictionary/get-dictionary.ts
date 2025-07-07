import {
  DictionaryItemDto as DictionaryItemSchema,
  ListFilterDto as QueryListFilterSchema,
  PageDto as PageDtoSchema,
  ParamIdFilterDto as ParamIdFilterSchema,
} from '../../typebox';
import {toDictionaryItemDto, toPageDto} from '../../dto/utils';
import {DB, DbUtils} from '@hiero/db';
import {FastifyTypeBox} from "../../types";

export const getDictionary = (fastify: FastifyTypeBox, db: DB) =>
  fastify.get(
    '/api/dictionary/:id',
    {
      schema: {
        description: 'returns particular dictionary',
        tags: ['dictionary'],
        summary: 'get dictionary',
        params: ParamIdFilterSchema,
        querystring: QueryListFilterSchema,
        response: {
          200: PageDtoSchema(DictionaryItemSchema),
          404: {$ref: 'HttpError'},
        },
      },
    },
    async function (request) {
      const {id} = request.params;
      const {from, pageSize} = request.query;

      return toPageDto(
        await DbUtils.getPage(await db.getDictionary(id), {
          from,
          pageSize,
          mapper: toDictionaryItemDto,
        })
      );
    }
  );
