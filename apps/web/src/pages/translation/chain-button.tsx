import * as React from 'react';
import { Hiero } from '../../components/hiero';
import { StyledCButton } from './styled';
import { DictionaryChainsDto } from '../../types/types';
import { CPopover } from '@coreui/react';

const wrapWithBrackets = (value?: string) => (value ? `(${value})` : '');

interface IChainButtonProps {
  chain: string[];
  index: number;
  chainIndex: number;
  selected: boolean;
  translations?: DictionaryChainsDto['chains']['string'];
  onClick: (row: number, col: number) => void;
}

export const ChainButton: React.FC<IChainButtonProps> = ({
  chain,
  index,
  chainIndex,
  selected,
  translations,
  onClick,
}) => {
  const content = React.useMemo(
    () =>
      Object.keys(translations ?? {})
        .flatMap((key) =>
          translations?.[key]?.map(
            ([interpretation, description]) =>
              `${interpretation} ${wrapWithBrackets(description)}`,
          ),
        )
        .join('\n'),
    [translations],
  );

  return (
    <CPopover content={content} placement="right" trigger={['focus', 'hover']}>
      <StyledCButton
        variant={selected ? undefined : 'outline'}
        color="primary"
        $firstRow={index + 1}
        $size={chain.length}
        onClick={() => onClick(index, chainIndex)}
      >
        {chain.map((h, i) => (
          <Hiero key={`${index}_${i}`} text={h} fontSize={30} />
        ))}
      </StyledCButton>
    </CPopover>
  );
};

ChainButton.displayName = 'ChainButton';
