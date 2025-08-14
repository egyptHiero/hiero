import * as React from 'react';
import { DictionaryChainsDto } from '../../types/types';
import styled from '@emotion/styled';
import { CPopover } from '@coreui/react';
import {
  StyledDescription,
  StyledInterpretation,
} from '../../components/styled';
import { wrapWithBrackets } from '../../utils';

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
  const content = React.useMemo(
    () =>
      Object.keys(translations ?? {}).flatMap((key, i) =>
        translations?.[key]?.map(([interpretation, description], j) => (
          <span key={`${row}_${column}_${i}_${j}`}>
            <StyledInterpretation>{interpretation}</StyledInterpretation>
            <StyledDescription>
              {wrapWithBrackets(description)}
            </StyledDescription>
            |
          </span>
        )),
      ),
    [column, row, translations],
  );

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
