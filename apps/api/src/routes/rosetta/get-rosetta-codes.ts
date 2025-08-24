import { toPageDto } from '../../dto';
import { FastifyTypeBox } from '../../types';
import { PageDto as PageDtoSchema } from '../../generated/typebox';
import { DbUtils } from '@hiero/db';
import { Type } from '@sinclair/typebox';

export const getRosettaCodes = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/rosetta/codes',
    {
      schema: {
        description: 'get rosetta codes',
        tags: ['rosetta'],
        summary: 'get rosetta codes',
        response: {
          200: PageDtoSchema(Type.Array(Type.String())),
        },
      },
    },
    async function () {
      return toPageDto(
        await DbUtils.getPage(fastify.db.getRosetta(), {
          pageSize: -1,
          mapper: (key, value) => [key, value.gardinerCodes || ''],
          filter: (_key, value) => {
            return !!value.gardinerCodes;
          },
        }),
      );
    },
  );
