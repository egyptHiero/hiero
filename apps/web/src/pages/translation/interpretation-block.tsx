import * as React from 'react';
import { DictionaryChainsDto } from '../../types/types';
import styled from '@emotion/styled';

interface IInterpretationBlockProps {
  column: number;
  row: number;
  size?: number;
  translations?: DictionaryChainsDto['chains']['string'];
}

const StyledDescription = styled.span({
  fontStyle: 'italic',
  paddingLeft: 4,
  fontSize: 'smaller',
});

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
            <StyledDescription>
              {description?.replace(/([[{}\]])/g, '')}
            </StyledDescription>
          </div>
        )),
      )}
    </div>
  );
};

InterpretationBlock.displayName = 'InterpretationBlock';
