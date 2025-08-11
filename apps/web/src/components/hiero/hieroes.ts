import { UNIGLYPHS } from './unipoints';

export const toUnicode = (text: string) =>
  text.split(/(\W)/g).map((name) => {
    const upperCaseName = name.toUpperCase();

    return UNIGLYPHS[upperCaseName]
      ? String.fromCodePoint(UNIGLYPHS[upperCaseName])
      : '';
  });
