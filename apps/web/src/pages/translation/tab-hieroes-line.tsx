import * as React from 'react';
import { getChainTable, getMaxChainColumnsCount } from './logic/chain-table';
import { ChainButton } from './chain-button';
import { StyledTranslationsGrid } from './styled';
import { InterpretationBlock } from './interpretation-block';
import { DictionaryChainsDto } from '../../types/types';
import { TLines } from '../sign/types';
import { CFormTextarea } from '@coreui/react';

interface TranslationTabHieroesLineProps {
  chains: DictionaryChainsDto['chains'];
  line: TLines[number];
}

export const TranslationTabHieroesLine: React.FC<
  TranslationTabHieroesLineProps
> = ({ chains, line }: TranslationTabHieroesLineProps) => {
  const chainTable = React.useMemo(
    () => getChainTable(line, chains),
    [chains, line],
  );

  const chainColumnsCount = React.useMemo(
    () => getMaxChainColumnsCount(chainTable),
    [chainTable],
  );

  const height = line?.hieroes.length ?? 0;
  const [selected, setSelected] = React.useState<boolean[][]>(
    Array.from({ length: height }).map(() => []),
  );

  const isSelected = (row: number, col: number) => {
    return !!selected[row]?.[col];
  };

  const handleClick = (row: number, col: number) => {
    setSelected((value) => {
      const isSelected = !value[row]?.[col];

      if (isSelected) {
        const lastRow = row + (chainTable[row]?.[col]?.length ?? 1) - 1;

        // unselect conflicting chains
        for (let i = 0; i <= lastRow; i++) {
          chainTable[i]?.forEach((chain, n) => {
            const count = chain.length;
            const arr = value[i];
            if (
              Array.isArray(arr) &&
              ((i >= row && i <= lastRow) || (i < row && i + count > row))
            ) {
              arr[n] = false;
            }
          });
        }
      }

      if (value[row]) {
        value[row][col] = isSelected;
      }

      return [...value];
    });
  };

  if (!chains) {
    return null;
  }

  return (
    <StyledTranslationsGrid $size={chainColumnsCount}>
      {line?.hieroes?.flatMap((hiero, index) =>
        chainTable[index]?.map((chain, chainIndex) => (
          <ChainButton
            chain={chain}
            index={index}
            chainIndex={chainIndex}
            key={line?.hieroKeys[index] + '_' + chain}
            selected={isSelected(index, chainIndex)}
            translations={chains[chain.join('-')]}
            onClick={handleClick}
          />
        )),
      )}

      {selected.map((selectedLine, index) => {
        const n = selectedLine.indexOf(true);
        const hiero = chainTable[index]?.[n];

        return hiero && n >= 0 ? (
          <InterpretationBlock
            column={chainColumnsCount + 2}
            row={index + 1}
            size={hiero?.length}
            translations={chains[hiero.join('-')]}
          />
        ) : undefined;
      })}

      <CFormTextarea
        className="w-100 h-100"
        style={{
          gridColumn: chainColumnsCount + 3,
          gridRow: `1 / ${height} span`,
          alignSelf: 'center',
          minWidth: '150px',
        }}
      />
    </StyledTranslationsGrid>
  );
};

TranslationTabHieroesLine.displayName = 'TranslationHieroesLine';
