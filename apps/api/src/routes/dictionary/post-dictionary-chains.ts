import {
  DictionaryChainsParams as DictionaryChainsParamsSchema,
  DictionaryChainsDto as DictionaryChainsDtoSchema,
} from '../../generated/typebox';
import { FastifyTypeBox } from '../../types';
import { findChains } from '../../logics/chains';
import { DictionaryItemEntity, Exceptions } from '@hiero/db';
import { DictionaryChainsDto } from '../../dto';

export const postDictionaryChains = (fastify: FastifyTypeBox) =>
  fastify.post(
    '/api/dictionary/chain',
    {
      schema: {
        description: 'find chains in the dictionary',
        tags: ['dictionary', 'chains'],
        summary: 'find dictionary chains',
        body: DictionaryChainsParamsSchema,
        response: {
          200: DictionaryChainsDtoSchema,
        },
      },
    },
    async function (request) {
      const { dictionaries, hieroes } = request.body;
      const warnings: Record<string, string> = {};

      const allChains = await Promise.all(
        dictionaries.map(async (dictionary) => {
          const table = await fastify.db
            .getDictionary(dictionary)
            .catch((e) => {
              if (e === Exceptions.DICTIONARY_NOT_EXISTS) {
                warnings[dictionary] = e.message;
                return undefined;
              }

              throw e;
            });

          return table
            ? findChains(table, hieroes, (_key, value) => value).then(
                (chains) =>
                  Object.entries(chains).reduce<DictionaryChainsDto['chains']>(
                    (acc, [key, value]) => {
                      acc[key] = {
                        [dictionary]: value.map(
                          ({ interpretation, description }) => [
                            interpretation,
                            description,
                          ],
                        ),
                      };
                      return acc;
                    },
                    {},
                  ),
              )
            : undefined;
        }),
      );

      return {
        chains: allChains.reduce((acc, chains) => {
          if (chains) {
            Object.entries(chains).forEach(([key, value]) => {
              if (!acc[key]) {
                acc[key] = {};
              }
              acc[key] = { ...acc[key], ...value };
            });
          }
          return acc;
        }, {}),
        warnings,
      };
    },
  );
