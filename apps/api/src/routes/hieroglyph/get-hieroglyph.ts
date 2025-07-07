import {QueryFilterDto as QueryFilterSchema} from '../../typebox';
import {DB, DbUtils} from '@hiero/db';
import {Type} from '@sinclair/typebox';
import {FastifyTypeBox} from "../../types";

export const getHieroglyph = (fastify: FastifyTypeBox, db: DB) =>
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
          404: {$ref: 'HttpError'},
        },
      },
    },
    async function (request) {
      const upperCaseQuery = request.query.query?.toUpperCase();

      return (
        await DbUtils.getPage(db.hieroglyphs, {
          filter: (key, value) =>
            upperCaseQuery
              ? key.toUpperCase().includes(upperCaseQuery) ||
              value?.toUpperCase().includes(upperCaseQuery)
              : true,
          mapper: (key, value) => [key, value],
          pageSize: request.query.pageSize,
        })
      ).reduce<Record<string, string>>((acc, [key, value]) => {
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {});
    }
  );
