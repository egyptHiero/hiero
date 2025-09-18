import { DictionaryItemEntity } from './entities';

const TEXT_DELIMITER = '|';

const uniq = (arr: string[]): string[] => {
  const result = Array.from(new Set(arr.map((s) => s?.trim()).filter(Boolean)));
  result.sort();
  return result;
};

/**
 * Join dictionary items` text and transcription, trim extra spaces and sort them.
 *
 * @param d1    - dictionary item 1
 * @param d2    - dictionary item 2
 */
export const joinDictionaryItems = (
  d1: DictionaryItemEntity,
  d2: DictionaryItemEntity,
): DictionaryItemEntity => ({
  text: uniq([...d1.text, ...d2.text]),
  transcription: uniq([...d1.transcription, ...d2.transcription]),
});

/**
 * Replace delimiters with '-' and convert to upper case.
 *
 * @param codes - Gardiner codes
 */
export const normalizeHieroes = (codes: string) =>
  codes
    .split(/\W+/)
    .map((v) => v?.trim())
    .filter(Boolean)
    .join('-')
    .toUpperCase();

const escapeDelimiter = (text: string, delimiter = TEXT_DELIMITER) =>
  text?.replace(new RegExp('\\' + delimiter, 'g'), '\\' + delimiter) || '';

/**
 * Combine interpretation and description in one delimited with pipe char.
 * Extra pipes are escaped.
 */
export const combineText = (interpretation: string, description: string) =>
  `${escapeDelimiter(interpretation)}|${escapeDelimiter(description)}`;
