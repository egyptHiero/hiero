import {
  combineText,
  joinDictionaryItems,
  normalizeHieroes,
} from '../dictionary-utils';

describe('joinDictionaryItems', () => {
  it('joins empty items', () => {
    expect(
      joinDictionaryItems(
        { text: [], transcription: [] },
        { text: [], transcription: [] },
      ),
    ).toStrictEqual({ text: [], transcription: [] });
  });

  it('joins empty and not-empty items', () => {
    expect(
      joinDictionaryItems(
        { text: ['a1'], transcription: ['b1'] },
        { text: [], transcription: [] },
      ),
    ).toStrictEqual({ text: ['a1'], transcription: ['b1'] });
  });

  it('joins items, trim extra spaces and sort', () => {
    expect(
      joinDictionaryItems(
        {
          text: [' a1', 'a2', '', undefined],
          transcription: [' b1', ' b2 ', '', undefined],
        },
        { text: [' a3 ', 'a2'], transcription: ['b3', 'b2'] },
      ),
    ).toStrictEqual({
      text: ['a1', 'a2', 'a3'],
      transcription: ['b1', 'b2', 'b3'],
    });
  });
});

describe('normalizeHieroes', () => {
  it('should replace delimiters with - and convert to upper case', () => {
    expect(normalizeHieroes('aa1a*(B1:c2b)')).toBe('AA1A-B1-C2B');
  });
});

describe('combineText', () => {
  it('should combine text with description', () => {
    expect(combineText('a', 'b')).toBe('a|b');
  });
  it('should escape pipes', () => {
    expect(combineText('a||', '|b|')).toBe('a\\|\\||\\|b\\|');
  });
});
