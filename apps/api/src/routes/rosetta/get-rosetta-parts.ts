import { FastifyTypeBox } from '../../types';
import {
  PageDto as PageDtoSchema,
  RosettaPartDto as RosettaDtoSchema,
  RosettaPartQuery as RosettaPartQuerySchema,
} from '../../generated/typebox';
import { toIdentifiableDto, toPageDto } from '../../dto';
import { DbUtils } from '@hiero/db';
import { searchIn } from '@hiero/common';

export const getRosettaParts = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/rosetta/part',
    {
      schema: {
        description: 'returns a list of all the available rosetta parts',
        tags: ['rosetta'],
        summary: 'get available rosetta parts',
        querystring: RosettaPartQuerySchema,
        response: {
          200: PageDtoSchema(RosettaDtoSchema),
        },
      },
    },
    async function (request) {
      const { from, pageSize, query, blankOnly } = request.query;

      return toPageDto(
        await DbUtils.getPage(fastify.db.getRosetta(), {
          from,
          pageSize,
          mapper: toIdentifiableDto,
          filter: (key, value) => {
            if (blankOnly === true && value.gardinerCodes) {
              return false;
            } else if (blankOnly === false && !value.gardinerCodes) {
              return false;
            }
            return searchIn(
              query,
              key,
              value.translation,
              value.transliteration,
              value.gardinerCodes,
            );
          },
        }),
      );
    },
  );
