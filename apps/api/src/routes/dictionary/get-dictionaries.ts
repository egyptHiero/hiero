import {
  DictionaryInfoDto as DictionaryInfoSchema,
  PageDto as PageSchema,
  QueryFilterDto as QueryFilterDtoSchema,
} from '../../generated/typebox';
import { toDictionaryInfoDto, toPageDto } from '../../dto';
import { DbUtils } from '@hiero/db';
import { FastifyTypeBox } from '../../types';
import { searchIn } from '@hiero/common';

export const getDictionaries = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/dictionary',
    {
      schema: {
        description: 'returns a list of all the available dictionaries',
        tags: ['dictionary', 'list'],
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
        await DbUtils.getPage(fastify.db.getDictionaryInfo(), {
          from,
          pageSize,
          mapper: toDictionaryInfoDto,
          filter: (key, value) =>
            searchIn(query, key, value.description, value.name, value.link),
        }),
      );
    },
  );
