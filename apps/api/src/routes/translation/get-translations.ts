import { DbUtils } from '@hiero/db';
import {
  PageDto as PageDtoSchema,
  QueryFilterDto as QueryFilterDtoSchema,
  TranslationDto as TranslationDtoSchema,
} from '../../generated/typebox';
import { toPageDto, toTranslationDto } from '../../dto';
import { FastifyTypeBox } from '../../types';
import { searchIn } from '@hiero/common';

export const getTranslations = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/translation',
    {
      schema: {
        description: 'returns a list of all the available translations',
        tags: ['translation'],
        summary: 'get available translations',
        querystring: QueryFilterDtoSchema,
        response: {
          200: PageDtoSchema(TranslationDtoSchema),
        },
      },
    },
    async function (request) {
      const { from, pageSize, query } = request.query;

      return toPageDto(
        await DbUtils.getPage(fastify.db.getTranslations(), {
          from,
          pageSize,
          mapper: toTranslationDto,
          filter: (key, value) => {
            return searchIn(query, key, value.name, value.description);
          },
        }),
      );
    },
  );
