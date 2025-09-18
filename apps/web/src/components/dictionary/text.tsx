import * as React from 'react';
import { StyledDescription, StyledInterpretation } from '../styled';

interface ITextProps {
  value: string;
}

type SplitTextResult = { interpretation?: string; description?: string };

const splitText = (text: string): SplitTextResult => {
  const matcher = text.match(/(.*)\|(.*)/);
  if (matcher) {
    return {
      interpretation: matcher[1],
      description: matcher[2],
    };
  }

  return {
    interpretation: undefined,
    description: undefined,
  };
};

const wrapWithBrackets = (value?: string) => (value ? `(${value})` : '');

export const Text: React.FC<ITextProps> = ({ value }) => {
  const { interpretation, description } = splitText(value);

  return (
    <>
      <StyledInterpretation>{interpretation}</StyledInterpretation>
      <StyledDescription>{wrapWithBrackets(description)}</StyledDescription>
    </>
  );
};

Text.displayName = 'Text';
