import { joinLine } from '../lines';

describe('joinLine', () => {
  it('should return empty string for empty line', () => {
    expect(
      joinLine({
        codes: '',
        delimiters: [],
        hieroKeys: [],
        hieroes: [],
      }),
    ).toBe('');
  });

  it('should return expected value for simple delimiters', () => {
    expect(
      joinLine({
        codes: '',
        delimiters: ['', '-', ''],
        hieroKeys: [],
        hieroes: ['A1', 'A2'],
      }),
    ).toBe('A1-A2');
  });

  it('should return expected value for complex delimiters', () => {
    expect(
      joinLine({
        codes: '',
        delimiters: ['(', ':', ')*(', ':', ')'],
        hieroKeys: [],
        hieroes: ['A1', 'A2', 'A3', 'A4'],
      }),
    ).toBe('(A1:A2)*(A3:A4)');
  });
});
