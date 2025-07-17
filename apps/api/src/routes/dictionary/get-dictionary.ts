import {
  DictionaryItemDto as DictionaryItemSchema,
  QueryFilterDto as QueryFilterDtoSchema,
  PageDto as PageDtoSchema,
  ParamIdFilterDto as ParamIdFilterSchema,
} from '../../typebox';
import { toDictionaryItemDto, toPageDto } from '../../dto';
import { DB, DbUtils } from '@hiero/db';
import { FastifyTypeBox } from '../../types';
import { searchIn } from '@hiero/common';

export const getDictionary = (fastify: FastifyTypeBox, db: DB) =>
  fastify.get(
    '/api/dictionary/:id',
    {
      schema: {
        description: 'returns particular dictionary',
        tags: ['dictionary'],
        summary: 'get dictionary',
        params: ParamIdFilterSchema,
        querystring: QueryFilterDtoSchema,
        response: {
          200: PageDtoSchema(DictionaryItemSchema),
          404: { $ref: 'HttpError' },
        },
      },
    },
    async function (request) {
      const { id } = request.params;
      const { from, pageSize, query } = request.query;

      return toPageDto(
        await DbUtils.getPage(await db.getDictionary(id), {
          from,
          pageSize,
          mapper: toDictionaryItemDto,
          filter: (key, value) => {
            return searchIn(
              query,
              key,
              ...value.flatMap((v) => [v.description, v.interpretation]),
            );
          },
        }),
      );
    },
  );
