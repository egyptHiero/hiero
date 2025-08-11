import { joinLines } from '../index';
import { DELIMITER_VERTICAL } from '../../../../constants';
import { expect } from 'vitest';

type TUpdateHiero = {
  current: Parameters<typeof joinLines>[1];
  expected: string;
};

describe('joinLines', () => {
  it('should return empty array for empty string', () => {
    expect(joinLines([])).toBe('');
  });

  it('should return codes without line delimiters for single line', () => {
    expect(
      joinLines([
        {
          codes: 'A1-A2',
          hieroes: ['A1', 'A2'],
          delimiters: ['', '-', ''],
          hieroKeys: [],
        },
      ]),
    ).toBe('A1-A2');
  });

  describe('should return codes with line delimiters for multiply lines', () => {
    const codes = [
      {
        codes: 'A1-A2',
        hieroes: ['A1', 'A2'],
        delimiters: ['', '-', ''],
        hieroKeys: [],
      },
      {
        codes: 'B1:B2*B3',
        hieroes: ['B1', 'B2', 'B3'],
        delimiters: ['', ':', '*', ''],
        hieroKeys: [],
      },
    ];

    it('without updates', () => {
      expect(joinLines(codes)).toBe('A1-A2\nB1:B2*B3');
    });

    describe('for hiero', () => {
      it.each<TUpdateHiero>([
        {
          current: [0, 0],
          expected: 'C3-A2\nB1:B2*B3',
        },
        {
          current: [1, 1],
          expected: 'A1-A2\nB1:C3*B3',
        },
        {
          current: [1, 10],
          expected: 'A1-A2\nB1:B2*B3-C3',
        },
      ])('with $current', ({ current, expected }) => {
        expect(
          joinLines(codes, current, {
            hiero: 'C3',
            variant: 'hiero',
          }),
        ).toBe(expected);
      });
    });

    describe('for left delimiter', () => {
      it.each<TUpdateHiero>([
        {
          current: [0, 0],
          expected: 'A1-A2\nB1:B2*B3',
        },
        {
          current: [1, 2],
          expected: 'A1-A2\nB1:B2:B3',
        },
        {
          current: [1, 3],
          expected: 'A1-A2\nB1:B2*B3',
        },
      ])('with $current', ({ current, expected }) => {
        expect(
          joinLines(codes, current, {
            hiero: DELIMITER_VERTICAL,
            variant: 'left-divider',
          }),
        ).toBe(expected);
      });
    });

    describe('for right delimiter', () => {
      it.each<TUpdateHiero>([
        {
          current: [0, 0],
          expected: 'A1:A2\nB1:B2*B3',
        },
        {
          current: [1, 1],
          expected: 'A1-A2\nB1:B2:B3',
        },
        {
          current: [1, 2],
          expected: 'A1-A2\nB1:B2*B3',
        },
      ])('with $current', ({ current, expected }) => {
        expect(
          joinLines(codes, current, {
            hiero: DELIMITER_VERTICAL,
            variant: 'right-divider',
          }),
        ).toBe(expected);
      });
    });
  });
});
