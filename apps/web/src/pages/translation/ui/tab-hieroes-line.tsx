import React from 'react';
import { ChangeEventHandler } from 'react';
import { getChainTable, getMaxChainColumnsCount } from '../logic/chain-table';
import { ChainButton } from './chain-button';
import {
  StyledTranslationsGrid,
  StyledTranslationsGridHeader,
} from '../styled';
import { InterpretationBlock } from './interpretation-block';
import { DictionaryChainsDto } from '../../../types/types';
import { CFormTextarea } from '@coreui/react';
import { TLine } from '../../sign/types';
import { useFormContext } from 'react-hook-form';
import { TranslationJsonLine, TranslationVO } from '../types';
import { getFromArray, parseJson, updateArray } from '../logic/array';

type UpdateSelectedFn = (
  value: TranslationJsonLine['selected'],
) => TranslationJsonLine['selected'];

interface TranslationTabHieroesLineProps {
  chains: DictionaryChainsDto['chains'];
  dictionaries: string[];
  line: TLine;
  lineIndex: number;
}

export const TranslationTabHieroesLine: React.FC<
  TranslationTabHieroesLineProps
> = ({
  chains,
  dictionaries,
  line,
  lineIndex,
}: TranslationTabHieroesLineProps) => {
  const chainTable = React.useMemo(
    () => getChainTable(line, chains),
    [chains, line],
  );

  const chainColumnsCount = React.useMemo(
    () => getMaxChainColumnsCount(chainTable),
    [chainTable],
  );

  const height = line?.hieroes.length ?? 0;
  const { watch, setValue } = useFormContext<TranslationVO>();

  const text = watch('text');
  const textLine = React.useMemo(
    () => getFromArray(text?.split('\n'), lineIndex),
    [lineIndex, text],
  );

  const json = parseJson<TranslationJsonLine[]>(watch('json'), []);
  const selected = React.useMemo<TranslationJsonLine['selected']>(() => {
    const result = getFromArray(json, lineIndex)?.selected;
    if (!result) {
      return Array.from({ length: height }).map(() => [true]);
    }
    result.length = height;
    return result.map((v) => (Array.isArray(v) ? v : []));
  }, [height, json, lineIndex]);

  const isSelected = (row: number, col: number) => {
    return !!selected?.[row]?.[col];
  };

  const setSelected = (fn: UpdateSelectedFn) => {
    setValue(
      'json',
      JSON.stringify(updateArray(json, lineIndex, { selected: fn(selected) })),
    );
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

  const updateCurrentTextLine: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    setValue(
      'text',
      updateArray(text?.split('\n'), lineIndex, target.value).join('\n'),
    );
  };

  if (!chains) {
    return null;
  }

  const rowShift = 1;

  return (
    <StyledTranslationsGrid
      $hieroesCount={chainColumnsCount}
      $dictionariesCount={dictionaries.length}
    >
      {dictionaries.map((dictionary, dictionaryIndex) => (
        <StyledTranslationsGridHeader
          key={dictionary}
          $position={chainColumnsCount + 2 + dictionaryIndex}
        >
          {dictionary}
        </StyledTranslationsGridHeader>
      ))}
      {line?.hieroes?.flatMap((hiero, index) =>
        chainTable[index]?.map((chain, chainIndex) => (
          <ChainButton
            chain={chain}
            index={index + rowShift}
            chainIndex={chainIndex}
            key={line?.hieroKeys[index] + '_' + chain}
            selected={isSelected(index, chainIndex)}
            translations={chains[chain.join('-')]}
            rowShift={rowShift}
            onClick={handleClick}
          />
        )),
      )}

      {selected.map((selectedLine, selectedIndex) => {
        const n = selectedLine.indexOf(true);
        const hiero = chainTable[selectedIndex]?.[n];

        return hiero && n >= 0 ? (
          <>
            {dictionaries.map((dictionary, dictionaryIndex) => (
              <InterpretationBlock
                key={line?.hieroKeys[selectedIndex] + '_' + dictionaryIndex}
                column={chainColumnsCount + dictionaryIndex + 2}
                row={selectedIndex + rowShift + 1}
                size={hiero?.length}
                item={chains[hiero.join('-')]?.[dictionary]}
              />
            ))}
          </>
        ) : undefined;
      })}

      <CFormTextarea
        className="w-100 h-100"
        style={{
          gridColumn: chainColumnsCount + dictionaries.length + 3,
          gridRow: `${rowShift + 1} / ${height} span`,
          alignSelf: 'center',
          minWidth: '150px',
        }}
        value={textLine}
        onChange={updateCurrentTextLine}
      />
    </StyledTranslationsGrid>
  );
};

TranslationTabHieroesLine.displayName = 'TranslationHieroesLine';
