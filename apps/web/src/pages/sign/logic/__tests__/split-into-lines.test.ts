import { splitIntoLines } from '../index';

describe('splitIntoLines', () => {
  it('should return empty array for empty string', () => {
    expect(splitIntoLines('')).toStrictEqual([]);
  });

  it('should return one line without new line delimiters', () => {
    expect(splitIntoLines('A1-A2')).toStrictEqual([
      {
        codes: 'A1-A2',
        hieroes: ['A1', 'A2'],
        delimiters: ['-'],
      },
    ]);
  });

  it('should return multiply lines for codes with line delimiters', () => {
    expect(splitIntoLines('A1-A2\nB1:B2*B3')).toStrictEqual([
      {
        codes: 'A1-A2',
        hieroes: ['A1', 'A2'],
        delimiters: ['-'],
      },
      {
        codes: 'B1:B2*B3',
        hieroes: ['B1', 'B2', 'B3'],
        delimiters: [':', '*'],
      },
    ]);
  });
});
