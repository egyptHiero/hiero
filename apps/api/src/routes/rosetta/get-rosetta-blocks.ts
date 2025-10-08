import { FastifyTypeBox } from '../../types';
import {
  PageDto as PageDtoSchema,
  QueryFilterDto as QueryFilterDtoSchema,
  RosettaBlocksDto as RosettaDtoSchema,
} from '../../generated/typebox';
import { RosettaBlocksDto, toIdentifiableDto, toPageDto } from '../../dto';
import { DbUtils } from '@hiero/db';
import { searchIn } from '@hiero/common';

export const getRosettaBlocks = (fastify: FastifyTypeBox) =>
  fastify.get(
    '/api/rosetta/block',
    {
      schema: {
        description: 'returns a list of all the available rosetta blocks',
        tags: ['rosetta'],
        summary: 'get available rosetta blocks',
        querystring: QueryFilterDtoSchema,
        response: {
          200: PageDtoSchema(RosettaDtoSchema),
        },
      },
    },
    async function (request) {
      const { from, pageSize, query } = request.query;

      return toPageDto(
        await DbUtils.getPage(fastify.db.getRosettaBlocks(), {
          from,
          pageSize,
          mapper: async (key, { translation, parts }) => {
            const arr = await fastify.db.getRosetta().getMany(parts);

            return {
              id: key,
              parts: arr.map((part, n) => toIdentifiableDto(parts[n], part)),
              translation,
            } as RosettaBlocksDto;
          },
          filter: (key, value) => {
            return searchIn(query, key, value.translation);
          },
        }),
      );
    },
  );
