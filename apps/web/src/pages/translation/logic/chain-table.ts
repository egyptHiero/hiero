import { TLine } from '../../sign/types';
import { DictionaryChainsDto } from '../../../types/types';

const areArraysEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((element, index) => element === arr2[index]);
};

type THieroes = string[];

/**
 * Builds table with chains for each hiero.
 *
 * @param line        - line of gardner codes
 * @param chains      - hiero chain from dictionary
 */
export const getChainTable = (
  line: TLine[][number],
  chains: DictionaryChainsDto['chains'],
): THieroes[][] => {
  // group chains keys by the first letter
  const chainKeys = Object.keys(chains).reduce<Record<string, THieroes[]>>(
    (acc, key) => {
      const hieroes = key.split('-');
      const firstHiero = hieroes[0] ?? '';
      if (!acc[firstHiero]) {
        acc[firstHiero] = [];
      }
      acc[firstHiero].push(hieroes);
      return acc;
    },
    {},
  );

  return line?.hieroes.map((hiero, index) => {
    const firstHiero = hiero.split('-')[0] ?? '';
    const chainKey = chainKeys[firstHiero];

    return chainKey
      ? chainKey
          .filter((values) => {
            return areArraysEqual(
              values,
              line.hieroes.slice(index, index + values.length),
            );
          })
          .sort((a, b) => {
            if (a.length === 1) {
              return -1;
            }
            if (b.length === 1) {
              return 1;
            }

            return b.length - a.length;
          })
      : [[firstHiero]];
  });
};

export const getMaxChainColumnsCount = (chainTable: THieroes[][]) => {
  const counts = chainTable?.reduce<Record<number, number>>(
    (acc, chains, index) => {
      chains.forEach((chain) => {
        for (let n = index; n < index + chain.length; n++) {
          acc[n] = (acc[n] ?? 0) + 1;
        }
      });
      return acc;
    },
    {},
  );

  return Math.max(...Object.values(counts));
};
