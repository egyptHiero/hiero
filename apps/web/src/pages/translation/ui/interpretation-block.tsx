import React from 'react';
import { DictionaryChainsDto } from '../../../types';
import { Dictionary } from '../../../controls/dictionary';
import { CTooltip } from '@coreui/react';

interface IInterpretationBlockProps {
  column: number;
  row: number;
  size?: number;
  item?: DictionaryChainsDto['chains']['string']['string'];
}

const Tooltip: React.FC<React.ComponentProps<typeof CTooltip>> = ({
  content,
  children,
}) => {
  if (!content) {
    return children;
  }

  return (
    <CTooltip content={content} placement="left">
      {children}
    </CTooltip>
  );
};

export const InterpretationBlock: React.FC<IInterpretationBlockProps> = ({
  column,
  row,
  size = 1,
  item,
}) => {
  const content = React.useMemo(() => {
    const { text, transcription } = item || {};
    return (
      <>
        <div>{transcription?.join(', ')}</div>
        {text?.map((line: string) => (
          <div key={line}>
            <Dictionary.Text value={line} />
          </div>
        ))}
      </>
    );
  }, [item]);

  return (
    <Tooltip content={content} placement="left">
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
    </Tooltip>
  );
};

InterpretationBlock.displayName = 'InterpretationBlock';
