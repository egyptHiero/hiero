import { DbTable, DictionaryItemEntity } from '@hiero/db';

export const findChains = async <R>(
  table: DbTable<DictionaryItemEntity>,
  hieroes: string[][],
  mapper: (key: string, value: DictionaryItemEntity) => R,
) => {
  const chains: Record<string, R> = {};

  for (const line of hieroes) {
    for (let first = 0; first < line.length; first++) {
      for (let i = first; i < line.length; i++) {
        const startKey = line.slice(first, i + 1).join('-');

        if (!chains[startKey]) {
          for await (const [key, value] of table.iterator({
            gte: startKey,
            lte: startKey,
            limit: 1,
          })) {
            chains[key] = mapper(key, value);
          }
        }
      }
    }
  }

  return chains;
};
