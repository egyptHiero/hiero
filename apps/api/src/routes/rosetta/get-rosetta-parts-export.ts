import { FastifyTypeBox } from '../../types';
import { RosettaPartQuery as RosettaPartQuerySchema } from '../../generated/typebox';
import { DbUtils } from '@hiero/db';
import { Type } from '@sinclair/typebox';

export const getRosettaPartsExport = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/rosetta/part/export',
    {
      schema: {
        description: 'returns a list of all the available rosetta parts',
        tags: ['rosetta'],
        summary: 'get available rosetta parts',
        querystring: RosettaPartQuerySchema,
        response: {
          200: Type.Record(Type.String(), Type.String()),
        },
      },
    },
    async function (request, response) {
      const data = await DbUtils.getPage(fastify.db.getRosetta(), {
        pageSize: -1,
        mapper: (key, value) => [key, value.gardinerCodes],
        filter: (key, value) => !!value.gardinerCodes,
      });

      response.send(
        data.items.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {}),
      );
    },
  );
