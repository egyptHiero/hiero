import { TLine } from '../pages/sign/types';
import { DELIMITER_NEAR, DELIMITER_NEW_LINE } from '../constants';

const calculateKeys = (values: string[]) => {
  const keys: Record<string, number> = {};

  return values.map((v) => {
    keys[v] = keys[v] ? keys[v] + 1 : 1;
    return `${v}_${keys[v]}`;
  });
};
/**
 * Splits string with Gardiner's codes into structure containing arrays of hieroglyphs, delimiters and unique keys.
 *
 * @param gardinerCodes   - string with Gardiner's codes.
 */
export const splitIntoLines = (gardinerCodes = ''): TLine[] =>
  gardinerCodes
    ? gardinerCodes
        .trim()
        .split(DELIMITER_NEW_LINE)
        .map((codes) => {
          const arr = codes.split(/(\W+)/).filter((v) => !!v);

          const hieroes = arr.filter((v) => v.match(/\w+/));
          const delimiters = arr.filter((v) => v.match(/\W+/));

          if (hieroes.length) {
            if (!arr[0]?.match(/\W+/)) {
              delimiters.unshift('');
            }
            if (!arr[arr.length - 1]?.match(/\W+/)) {
              delimiters.push('');
            }
          }

          if (!delimiters.length) {
            delimiters.push('');
          }
          return {
            codes,
            hieroes,
            hieroKeys: calculateKeys(hieroes),
            delimiters,
          };
        })
    : [
        {
          codes: '',
          hieroes: [],
          hieroKeys: [],
          delimiters: [''],
        },
      ];
/**
 * Restores string with Gardiner's codes from arrays of hieroglyphs and delimiters
 *
 * @param line
 */
export const joinLine = (line: TLine): string =>
  line.delimiters
    .map((value, position) => {
      return `${value ?? DELIMITER_NEAR}${line.hieroes[position] ?? ''}`;
    })
    .join('');
