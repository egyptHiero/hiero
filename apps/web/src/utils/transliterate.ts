const transliterationMap: Record<string, string> = {
  A: 'ꜣ',
  D: 'ḏ',
  H: 'ḥ',
  I: 'ỉ',
  K: 'ḳ',
  S: 'š',
  T: 'ṯ',
  X: 'ḫ',
  a: 'ꜥ',
  j: 'ï',
  x: 'ḫ',
} as const;

const transliterationRegExp = new RegExp(
  `[${Object.keys(transliterationMap).join()}]`,
  'g',
);

/**
 * Transliterate characters in string according to
 * https://en.wiktionary.org/wiki/Appendix:Egyptian_transliteration_schemes
 *
 * @param text  - string to transliterate
 */
export const transliterate = (text?: string) =>
  text?.replace(
    transliterationRegExp,
    (char) => transliterationMap[char] || char,
  );
