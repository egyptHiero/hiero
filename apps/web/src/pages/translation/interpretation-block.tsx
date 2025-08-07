import * as React from 'react';
import { DictionaryChainsDto } from '../../types/types';

interface IInterpretationBlockProps {
  column: number;
  row: number;
  size?: number;
  translations?: DictionaryChainsDto['chains']['string'];
}

export const InterpretationBlock: React.FC<IInterpretationBlockProps> = ({
  column,
  row,
  size = 1,
  translations = {},
}) => {
  return (
    <div
      className="form-control overflow-auto"
      style={{
        gridColumn: column,
        gridRow: `${row} / ${size} span`,
        alignSelf: 'center',
        height: `${size * 4}rem`,
      }}
    >
      {Object.keys(translations ?? {}).flatMap((key) =>
        translations?.[key]?.map(([interpretation, description], n) => (
          <div key={n}>
            {interpretation}
            <i>{description}</i>
          </div>
        )),
      )}
    </div>
  );
};

InterpretationBlock.displayName = 'InterpretationBlock';
