import {
  DELIMITER_NEAR,
  DELIMITER_NEW_LINE,
  SUPPORTED_DELIMITERS,
  SUPPORTED_DELIMITERS_REGEXP,
} from '../../../constants';

type TCurrent = [number, number, number];
type THiero = { value: string; variant: 'left' | 'right' | 'hiero' };
type TLines = Array<{ codes: string; hieroes: string[]; delimiters: string[] }>;

export const splitIntoLines = (gardinerCodes = ''): TLines =>
  gardinerCodes
    ? gardinerCodes.split(DELIMITER_NEW_LINE).map((line) => {
        const all = line.split(SUPPORTED_DELIMITERS_REGEXP);
        return {
          codes: line,
          hieroes: all.filter((v) => !SUPPORTED_DELIMITERS.includes(v)),
          delimiters: all.filter((v) => SUPPORTED_DELIMITERS.includes(v)),
        };
      })
    : [];

export const joinLine = (line: TLines[number]): string =>
  line.hieroes
    .map((value, position, array) => {
      const defaultDelimiter =
        position === array.length - 1 ? DELIMITER_NEW_LINE : DELIMITER_NEAR;
      return `${value}${line.delimiters[position] ?? defaultDelimiter}`;
    })
    .join('');

const updateLine = (
  line: TLines[number],
  lineIndex: number,
  current?: TCurrent,
  hiero?: THiero,
): TLines[number] => {
  if (current && hiero) {
    const [currentLineIndex, hieroIndex] = current;

    if (lineIndex === currentLineIndex) {
      const hieroes = [...line.hieroes];
      const delimiters = [...line.delimiters];

      switch (hiero.variant) {
        case 'left':
          if (hieroIndex > 0 && hieroIndex <= delimiters.length) {
            delimiters[hieroIndex - 1] = hiero.value;
          }
          break;
        case 'right':
          if (hieroIndex < delimiters.length) {
            delimiters[hieroIndex] = hiero.value;
          }
          break;
        case 'hiero':
          hieroes[hieroIndex] = hiero.value;
          break;
      }

      return { ...line, hieroes, delimiters };
    }
  }
  return line;
};

export const joinLines = (
  lines: TLines,
  current?: TCurrent,
  hiero?: THiero,
): string =>
  lines
    .map((line, lineIndex) =>
      joinLine(updateLine(line, lineIndex, current, hiero)),
    )
    .join('')
    .trimEnd();
