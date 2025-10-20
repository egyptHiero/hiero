import {
  ParamIdFilterDto as ParamIdFilterSchema,
  QueryFilterDto as QueryFilterDtoSchema,
} from '../../generated/typebox';
import { toPageDto } from '../../dto';
import { FastifyTypeBox } from '../../types';
import { DbUtils } from '@hiero/db';
import { searchIn } from '@hiero/common';

export const getDictionaryExport = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/dictionary/:id/export',
    {
      schema: {
        description: 'export dictionary',
        tags: ['dictionary', 'export'],
        summary: 'export dictionary',
        params: ParamIdFilterSchema,
        querystring: QueryFilterDtoSchema,
      },
    },
    async function (request) {
      const { id } = request.params;
      const { from, pageSize, query } = request.query;

      return toPageDto(
        await DbUtils.getPage(await fastify.db.getDictionary(id), {
          from,
          pageSize,
          mapper: (key, value) => [key, [value.text]],
          filter: (key, value) => {
            return searchIn(
              query,
              key,
              value.text?.join(' '),
              value.transcription?.join(' '),
            );
          },
        }),
      );
    },
  );
