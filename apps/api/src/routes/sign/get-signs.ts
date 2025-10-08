import { DbUtils } from '@hiero/db';
import {
  PageDto as PageDtoSchema,
  QueryFilterDto as QueryFilterDtoSchema,
  SignDto as SignDtoSchema,
} from '../../generated/typebox';
import { toIdentifiableDto, toPageDto } from '../../dto';
import { FastifyTypeBox } from '../../types';
import { searchIn } from '@hiero/common';

export const getSigns = (fastify: FastifyTypeBox) =>
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
        await DbUtils.getPage(fastify.db.getSigns(), {
          from,
          pageSize,
          mapper: toIdentifiableDto,
          filter: (key, value) => {
            return searchIn(
              query,
              key,
              value.name,
              value.description,
              value.gardinerCodes,
              value.image,
            );
          },
        }),
      );
    },
  );
