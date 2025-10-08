import React from 'react';
import { DictionaryChainsDto } from '../../../types/types';
import { CPopover } from '@coreui/react';
import { Dictionary } from '../../../components/dictionary';

interface IInterpretationBlockProps {
  column: number;
  row: number;
  size?: number;
  item?: DictionaryChainsDto['chains']['string']['string'];
}

export const InterpretationBlock: React.FC<IInterpretationBlockProps> = ({
  column,
  row,
  size = 1,
  item,
}) => {
  const content = React.useMemo(() => {
    const { text } = item || {};
    return (
      <>
        {text?.map((line: string) => (
          <Dictionary.Text key={line} value={line} />
        ))}
      </>
    );
  }, [item]);

  return (
    <CPopover content={content} placement="left" trigger={['focus', 'hover']}>
      <div
        className="form-control overflow-auto"
        style={{
          gridColumn: column,
          gridRow: `${row} / ${size} span`,
          alignSelf: 'center',
          height: `${size * 4}rem`,
        }}
      >
        {content}
      </div>
    </CPopover>
  );
};

InterpretationBlock.displayName = 'InterpretationBlock';
