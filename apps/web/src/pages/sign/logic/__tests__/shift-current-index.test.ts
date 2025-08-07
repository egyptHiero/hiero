import { shiftCurrentIndex, splitIntoLines } from '../index';
import { TLine } from '../../types';

const lines: TLine[] = splitIntoLines('A1-A2-A3\nB1\nC1-C2');

describe('shiftCurrentIndex', () => {
  it('should return expected values for negative shifts', () => {
    expect(shiftCurrentIndex(-1, lines, [0, 0])).toStrictEqual([0, 0]);
    expect(shiftCurrentIndex(-1, lines, [1, 0])).toStrictEqual([0, 2]);
    expect(shiftCurrentIndex(-3, lines, [1, 0])).toStrictEqual([0, 0]);
    expect(shiftCurrentIndex(-3, lines, [2, 1])).toStrictEqual([0, 2]);
  });

  it('should return expected values for positive shifts', () => {
    expect(shiftCurrentIndex(1, lines, [0, 0])).toStrictEqual([0, 1]);
    expect(shiftCurrentIndex(2, lines, [0, 0])).toStrictEqual([0, 2]);
    expect(shiftCurrentIndex(5, lines, [0, 0])).toStrictEqual([2, 1]);
    expect(shiftCurrentIndex(10, lines, [0, 0])).toStrictEqual([2, 2]);
  });
});
