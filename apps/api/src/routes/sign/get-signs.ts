import { DB, DbUtils } from '@hiero/db';
import {
  QueryFilterDto as QueryFilterDtoSchema,
  PageDto as PageDtoSchema,
  SignDto as SignDtoSchema,
} from '../../generated/typebox';
import { toPageDto, toSignDto } from '../../dto';
import { FastifyTypeBox } from '../../types';
import { searchIn } from '@hiero/common';

export const getSigns = (fastify: FastifyTypeBox, db: DB) =>
  fastify.get(
    '/api/sign',
    {
      schema: {
        description: 'returns a list of all the available signs',
        tags: ['sign'],
        summary: 'get available signs',
        querystring: QueryFilterDtoSchema,
        response: {
          200: PageDtoSchema(SignDtoSchema),
        },
      },
    },
    async function (request) {
      const { from, pageSize, query } = request.query;

      return toPageDto(
        await DbUtils.getPage(db.getSigns(), {
          from,
          pageSize,
          mapper: toSignDto,
          filter: (key, value) => {
            return searchIn(
              query,
              key,
              value.name,
              value.description,
              value.classification,
              value.image,
            );
          },
        }),
      );
    },
  );
