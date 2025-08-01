import {
  DELIMITER_NEAR,
  DELIMITER_NEW_LINE,
  SUPPORTED_DELIMITERS,
  SUPPORTED_DELIMITERS_REGEXP,
} from '../../../constants';

import { TCurrent, THieroChange, TLines } from '../types';

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
  value?: THieroChange,
): TLines[number] => {
  if (current && value) {
    const [currentLineIndex, hieroIndex] = current;

    if (lineIndex === currentLineIndex) {
      const hieroes = [...line.hieroes];
      const delimiters = [...line.delimiters];

      switch (value.variant) {
        case 'left-divider':
          if (hieroIndex > 0 && hieroIndex <= delimiters.length) {
            delimiters[hieroIndex - 1] = value.hiero;
          }
          break;
        case 'right-divider':
          if (hieroIndex < delimiters.length) {
            delimiters[hieroIndex] = value.hiero;
          }
          break;
        case 'hiero':
          hieroes[hieroIndex] = value.hiero;
          break;
        case 'hiero-left':
          hieroes.splice(hieroIndex, 0, value.hiero);
          delimiters.splice(hieroIndex - 1, 0, '-');
          break;
        case 'hiero-right':
          hieroes.splice(hieroIndex + 1, 0, value.hiero);
          delimiters.splice(hieroIndex, 0, '-');
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
  hiero?: THieroChange,
): string =>
  lines
    .map((line, lineIndex) =>
      joinLine(updateLine(line, lineIndex, current, hiero)),
    )
    .join('')
    .trimEnd();

export const shiftCurrentIndex = (
  value: number,
  lines: TLines,
  current: TCurrent,
  force = false,
): TCurrent => {
  let index = current[0];
  let pos = current[1] + value;

  if (!force) {
    if (value < 0) {
      while (index > 0 && pos < 0) {
        pos += lines[--index]?.hieroes.length ?? 0;
      }
      pos = Math.max(pos, 0);
    } else if (value > 0) {
      while (pos >= (lines[index]?.hieroes.length ?? Infinity)) {
        pos -= lines[index++]?.hieroes.length ?? 0;
      }

      if (index >= lines.length) {
        index = lines.length - 1;
        pos = Math.min(pos, lines[index]?.hieroes.length ?? 0);
      }
    }
  }

  return [index, pos];
};
