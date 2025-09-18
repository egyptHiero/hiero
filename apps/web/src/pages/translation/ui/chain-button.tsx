import * as React from 'react';
import { Hiero } from '../../../components/hiero';
import { StyledCButton } from '../styled';
import { DictionaryChainsDto } from '../../../types/types';
import { CPopover } from '@coreui/react';
import { Dictionary } from '../../../components/dictionary';

interface IChainButtonProps {
  rowShift: number;
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
  rowShift,
  onClick,
}) => {
  const content = React.useMemo(
    () =>
      Object.keys(translations ?? {}).map((key) => {
        const { text } = translations?.[key] || {};
        return text?.map((line) => <Dictionary.Text key={line} value={line} />);
      }),
    [translations],
  );

  return (
    <CPopover content={content} placement="right" trigger={['focus', 'hover']}>
      <StyledCButton
        variant={selected ? undefined : 'outline'}
        color="primary"
        $firstRow={index + 1}
        $size={chain.length}
        onClick={() => onClick(index - rowShift, chainIndex)}
      >
        {chain.map((h, i) => (
          <Hiero key={`${index}_${i}`} text={h} fontSize={30} />
        ))}
      </StyledCButton>
    </CPopover>
  );
};

ChainButton.displayName = 'ChainButton';
