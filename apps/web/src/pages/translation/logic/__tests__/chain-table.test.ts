import { getChainTable, getMaxChainColumnsCount } from '../chain-table';
import { TLine } from '../../../sign/types';

describe('getChainTable', () => {
  it('should build table with hiero chains ', () => {
    expect(
      getChainTable(
        {
          hieroes: ['A1', 'A2', 'A3', 'A4'],
        } as TLine[][number],
        {
          A2: { test: [] },
          'A2-A3': { test: [] },
          'A2-A3-A4': { test: [] },
        },
      ),
    ).toStrictEqual([
      [['A1']],
      [['A2'], ['A2', 'A3', 'A4'], ['A2', 'A3']],
      [['A3']],
      [['A4']],
    ]);
  });
});

describe('getMaxChainColumnsCount', () => {
  it('should return exact max count', () => {
    expect(
      getMaxChainColumnsCount([
        [['A1'], ['A2', 'B2'], ['A3']],
        [['B1'], ['B2'], ['B3']],
      ]),
    ).toBe(4);
  });
});
