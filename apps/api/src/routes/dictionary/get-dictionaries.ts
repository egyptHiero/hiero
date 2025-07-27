import {
  DictionaryInfoDto as DictionaryInfoSchema,
  QueryFilterDto as QueryFilterDtoSchema,
  PageDto as PageSchema,
} from '../../generated/typebox';
import { toDictionaryInfoDto, toPageDto } from '../../dto';
import { DB, DbUtils } from '@hiero/db';
import { FastifyTypeBox } from '../../types';
import { searchIn } from '@hiero/common';

export const getDictionaries = (fastify: FastifyTypeBox, db: DB) =>
  fastify.get(
    '/api/dictionary',
    {
      schema: {
        description: 'returns a list of all the available dictionaries',
        tags: ['dictionary'],
        summary: 'get available dictionaries',
        querystring: QueryFilterDtoSchema,
        response: {
          200: PageSchema(DictionaryInfoSchema),
        },
      },
    },
    async function (request) {
      const { from, pageSize, query } = request.query;

      return toPageDto(
        await DbUtils.getPage(db.getDictionaryInfo(), {
          from,
          pageSize,
          mapper: toDictionaryInfoDto,
          filter: (key, value) =>
            searchIn(query, key, value.description, value.name, value.link),
        }),
      );
    },
  );
