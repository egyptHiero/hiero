import { DB, DbUtils } from '@hiero/db';
import {
  QueryFilterDto as QueryFilterDtoSchema,
  PageDto as PageDtoSchema,
  SignDto as SignDtoSchema,
} from '../../typebox';
import { toPageDto, toSignDto } from '../../dto';
import { FastifyTypeBox } from '../../types';

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
      return toPageDto(
        await DbUtils.getPage(db.getSigns(), {
          ...request.query,
          mapper: toSignDto,
        }),
      );
    },
  );
