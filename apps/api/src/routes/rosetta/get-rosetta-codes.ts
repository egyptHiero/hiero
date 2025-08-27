import { FastifyTypeBox } from '../../types';
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
          200: Type.Record(Type.String(), Type.String()),
        },
      },
    },
    async function () {
      const page = await DbUtils.getPage(fastify.db.getRosetta(), {
        pageSize: -1,
        mapper: (key, value) => [key, value.gardinerCodes || ''],
        filter: (_key, value) => {
          return !!value.gardinerCodes;
        },
      });

      return page.items.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    },
  );
