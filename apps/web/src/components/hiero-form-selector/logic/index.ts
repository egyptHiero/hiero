import { TCurrent, THieroChange, TLine } from '../types';
import { joinLine } from '../../../utils';
import { DELIMITER_NEAR, DELIMITER_NEW_LINE } from '../../../constants';

const updateLine = (
  line: TLine,
  lineIndex: number,
  current?: TCurrent,
  value?: THieroChange,
): TLine => {
  if (current && value) {
    const [currentLineIndex, hieroIndex] = current;

    if (lineIndex === currentLineIndex) {
      const hieroes = [...line.hieroes];
      const delimiters = [...line.delimiters];

      switch (value.variant) {
        case 'left-divider':
          if (hieroIndex > 0 && hieroIndex < delimiters.length - 1) {
            delimiters[hieroIndex] = value.hiero;
          }
          break;
        case 'right-divider':
          if (hieroIndex < delimiters.length - 2) {
            delimiters[hieroIndex + 1] = value.hiero;
          }
          break;
        case 'hiero':
          if (hieroIndex < hieroes.length) {
            hieroes[hieroIndex] = value.hiero;
          } else {
            if (delimiters[hieroes.length] === '') {
              delimiters.splice(hieroes.length, 0, DELIMITER_NEAR);
            } else {
              delimiters.push('');
            }
            hieroes.push(value.hiero);
          }
          break;
        case 'hiero-left':
          if (hieroes.length) {
            const delta = hieroIndex === 0 ? 1 : 0;
            delimiters.splice(hieroIndex + delta, 0, '-');
          }
          hieroes.splice(hieroIndex, 0, value.hiero);
          break;
        case 'hiero-right':
          if (hieroes.length) {
            delimiters.splice(hieroIndex + 1, 0, '-');
          }
          hieroes.splice(hieroIndex + 1, 0, value.hiero);
          break;
      }

      return { ...line, hieroes, delimiters };
    }
  }
  return line;
};

/**
 * Restores Gardiner's codes string from lines array and insert hiero or delimiter at specified position
 *
 * @param lines     - TLine array
 * @param current   - position to insert at
 * @param value     - hiero or delimiter to insert
 */
export const joinLines = (
  lines: TLine[],
  current?: TCurrent,
  value?: THieroChange,
): string =>
  lines
    .map(
      (line, lineIndex) =>
        joinLine(updateLine(line, lineIndex, current, value)) +
        DELIMITER_NEW_LINE,
    )
    .join('')
    .trimEnd();

export const shiftCurrentIndex = (
  value: number,
  lines: TLine[],
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
