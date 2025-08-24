import { splitIntoLines } from '../lines';

describe('splitIntoLines', () => {
  it('should return empty array for empty string', () => {
    expect(splitIntoLines('')).toStrictEqual([
      {
        codes: '',
        hieroes: [],
        hieroKeys: [],
        delimiters: [''],
      },
    ]);
  });

  it('should return empty lines object for string with spaces', () => {
    expect(splitIntoLines(' ')).toStrictEqual([
      {
        codes: '',
        hieroes: [],
        hieroKeys: [],
        delimiters: [''],
      },
    ]);
  });

  it('should return one line without new line delimiters', () => {
    expect(splitIntoLines('A1-A2')).toStrictEqual([
      {
        codes: 'A1-A2',
        hieroes: ['A1', 'A2'],
        hieroKeys: ['A1_1', 'A2_1'],
        delimiters: ['', '-', ''],
      },
    ]);
  });

  it('should return multiply lines for codes with line delimiters', () => {
    expect(splitIntoLines('A1-A2\nB1:B2*B3')).toStrictEqual([
      {
        codes: 'A1-A2',
        hieroes: ['A1', 'A2'],
        hieroKeys: ['A1_1', 'A2_1'],
        delimiters: ['', '-', ''],
      },
      {
        codes: 'B1:B2*B3',
        hieroes: ['B1', 'B2', 'B3'],
        hieroKeys: ['B1_1', 'B2_1', 'B3_1'],
        delimiters: ['', ':', '*', ''],
      },
    ]);
  });

  it('should return one line without new line delimiters', () => {
    expect(splitIntoLines('(A1:A2)*(A3:A4)')).toStrictEqual([
      {
        codes: '(A1:A2)*(A3:A4)',
        hieroes: ['A1', 'A2', 'A3', 'A4'],
        hieroKeys: ['A1_1', 'A2_1', 'A3_1', 'A4_1'],
        delimiters: ['(', ':', ')*(', ':', ')'],
      },
    ]);
  });
});
