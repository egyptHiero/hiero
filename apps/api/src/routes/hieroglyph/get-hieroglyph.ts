import { QueryFilterDto as QueryFilterSchema } from '../../generated/typebox';
import { DbUtils } from '@hiero/db';
import { Type } from '@sinclair/typebox';
import { FastifyTypeBox } from '../../types';

export const getHieroglyph = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/hieroglyph',
    {
      schema: {
        description: 'returns the hieroglyph descriptions',
        tags: ['hieroglyph'],
        summary: 'get hieroglyph descriptions',
        querystring: QueryFilterSchema,
        response: {
          200: Type.Record(Type.String(), Type.String()),
          404: { $ref: 'HttpError' },
        },
      },
    },
    async function (request) {
      const { query, from, pageSize } = request.query;
      const upperCaseQuery = query?.toUpperCase();

      return (
        await DbUtils.getPage(fastify.db.hieroglyphs, {
          from,
          filter: (key, value) =>
            upperCaseQuery
              ? key.toUpperCase().includes(upperCaseQuery) ||
                value?.toUpperCase().includes(upperCaseQuery)
              : true,
          mapper: (key, value) => [key, value],
          pageSize,
        })
      ).items.reduce<Record<string, string>>((acc, [key, value]) => {
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {});
    },
  );
