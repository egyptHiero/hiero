import {DB, DbTable} from '../types';
import {createDbInstance} from '../db';
import {asyncIterator} from '@hiero/common';
import {DbUtils, DEFAULT_PAGE_SIZE, DictionaryItemEntity} from '@hiero/db';

const SET1 = {
  A1: 'seated man',
  A2: 'man with hand to mouth',
  A3: 'man sitting on heel',
};

const DICTIONARY_SET1: Record<string, DictionaryItemEntity> = {
  A1: [{interpretation: 'seated man'}],
  A2: [{interpretation: 'man with hand to mouth'}],
  A3: [{interpretation: 'man sitting on heel'}],
};

describe('DbUtils', () => {
  let db: DB;

  beforeEach(async () => {
    db = await createDbInstance();
  });

  afterEach(() => {
    db.close();
  });

  describe('with hieroglyphs table', () => {
    beforeEach(async () => {
      await db.hieroglyphs.batch(
        Object.entries(SET1).map(([key, value]) => ({
          key,
          value,
          type: 'put',
        }))
      );
    });

    describe('hasKey()', () => {
      it('should determine the presence of the key', async () => {
        expect(await DbUtils.hasKey(db.hieroglyphs, 'A1')).toBeTruthy();
        expect(await DbUtils.hasKey(db.hieroglyphs, 'a')).toBeFalsy();
        expect(await DbUtils.hasKey(db.hieroglyphs, '')).toBeFalsy();
      });
    });

    describe('getSize()', () => {
      it('should count the records in the table', async () => {
        expect(await DbUtils.getSize(db.hieroglyphs)).toBe(3);
      });
    });

    describe('getPage()', () => {
      it('should return record from the table', async () => {
        expect(await DbUtils.getPage(db.hieroglyphs)).toStrictEqual([
          SET1.A1,
          SET1.A2,
          SET1.A3,
        ]);
      });

      it('should apply pageSize parameter correctly', async () => {
        expect(
          await DbUtils.getPage(db.hieroglyphs, {pageSize: 1})
        ).toStrictEqual([SET1.A1]);
      });

      it('should apply pageSize=-1 as unlimited', async () => {
        const data: Array<[string, string]> = Array.from(
          {length: DEFAULT_PAGE_SIZE + 10},
          (_, i) => [`B${i + 1}`, `value ${i + 1}`]
        );

        await DbUtils.update(db.hieroglyphs, data.values());
        expect(
          await DbUtils.getPage(db.hieroglyphs, {
            filter: ([key]) => !!key && key.startsWith('B'),
            pageSize: -1,
          })
        ).toHaveLength(DEFAULT_PAGE_SIZE + 10);
      });

      it('should apply from parameter correctly', async () => {
        expect(
          await DbUtils.getPage(db.hieroglyphs, {from: 'A11'})
        ).toStrictEqual([SET1.A2, SET1.A3]);
      });

      it('should apply to parameter correctly', async () => {
        expect(
          await DbUtils.getPage(db.hieroglyphs, {to: 'A1'})
        ).toStrictEqual([SET1.A1]);
      });

      it('should apply filter parameter correctly', async () => {
        expect(
          await DbUtils.getPage(db.hieroglyphs, {
            filter: (key) => key === 'A1',
          })
        ).toStrictEqual(['seated man']);
        expect(
          await DbUtils.getPage(db.hieroglyphs, {
            filter: (_key, value) => !value?.includes('mouth'),
          })
        ).toStrictEqual(['seated man', 'man sitting on heel']);
      });

      it('should apply mapper parameter correctly', async () => {
        expect(
          await DbUtils.getPage(db.hieroglyphs, {
            mapper: (key) => key,
          })
        ).toStrictEqual(['A1', 'A2', 'A3']);
      });

      it('should apply mapper empty parameter correctly', async () => {
        expect(
          await DbUtils.getPage(db.hieroglyphs, {
            from: undefined,
            to: undefined,
            filter: undefined,
            mapper: undefined,
            pageSize: undefined,
          })
        ).toStrictEqual([
          'seated man',
          'man with hand to mouth',
          'man sitting on heel',
        ]);
      });
    });
  });

  describe('with dictionary', () => {
    beforeEach(async () => {
      vi.clearAllMocks();
    });

    describe('update()', () => {
      const mockPut = vi.fn();
      const mockWrite = vi.fn();

      const mockTable = {
        batch: vi.fn(() => ({
          put: () => mockPut(),
          write: () => mockWrite(),
        })),
      } as unknown as DbTable<DictionaryItemEntity>;

      describe.each([
        {
          description: 'with iterator',
          getIterator: () => Object.entries(DICTIONARY_SET1),
        },
        {
          description: 'with async iterator',
          getIterator: () => asyncIterator(Object.entries(DICTIONARY_SET1)),
        },
      ])('$description', ({getIterator}) => {
        it('updates the dictionary', async () => {
          const dict = await db.createDictionary({
            name: 'test1',
            language: 'en',
          });
          await DbUtils.update(dict, getIterator());
          expect(await DbUtils.getPage(dict)).toStrictEqual([
            DICTIONARY_SET1.A1,
            DICTIONARY_SET1.A2,
            DICTIONARY_SET1.A3,
          ]);
        });

        describe('and batchThreshold', () => {
          it('by default', async () => {
            await DbUtils.update(mockTable, getIterator());
            expect(mockTable.batch).toHaveBeenCalledTimes(1);
            expect(mockWrite).toHaveBeenCalledTimes(1);
            expect(mockPut).toHaveBeenCalledTimes(3);
          });

          it('is 1', async () => {
            await DbUtils.update(mockTable, getIterator(), {
              batchThreshold: 1,
            });
            expect(mockTable.batch).toHaveBeenCalledTimes(3);
            expect(mockWrite).toHaveBeenCalledTimes(3);
            expect(mockPut).toHaveBeenCalledTimes(3);
          });

          it('is 2', async () => {
            await DbUtils.update(mockTable, getIterator(), {
              batchThreshold: 2,
            });
            expect(mockTable.batch).toHaveBeenCalledTimes(2);
            expect(mockWrite).toHaveBeenCalledTimes(2);
            expect(mockPut).toHaveBeenCalledTimes(3);
          });

          it('is 3', async () => {
            await DbUtils.update(mockTable, getIterator(), {
              batchThreshold: 3,
            });
            expect(mockTable.batch).toHaveBeenCalledTimes(1);
            expect(mockWrite).toHaveBeenCalledTimes(1);
            expect(mockPut).toHaveBeenCalledTimes(3);
          });
        });
      });
    });
  });
});
