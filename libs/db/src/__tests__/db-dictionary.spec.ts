import { DB } from '../types';
import { createDbInstance } from '../db';
import { DbUtils, GetPageProps } from '../db-utils';
import { DictionaryInfoEntity } from '../entities';

describe('DB-dictionaries', () => {
  let db: DB;

  beforeEach(async () => {
    db = await createDbInstance();
  });

  afterEach(() => {
    db.close();
  });

  describe('public and private dictionaries do not intersect', () => {
    beforeEach(async () => {
      await Promise.all([
        db.createDictionary({
          description: 'about1',
          language: 'en',
          name: 'dict1',
        }),
        db.createDictionary(
          {
            description: 'about2',
            language: 'en',
            name: 'dict2',
          },
          'user1'
        ),
        db.createDictionary(
          {
            description: 'about3',
            language: 'en',
            name: 'dict3',
          },
          'user2'
        ),
      ]);
    });

    it('and getDictionaryInfo() returns expected dictionary info', async () => {
      const mapper: GetPageProps<DictionaryInfoEntity, string>['mapper'] = (
        _key,
        value
      ) => value.name;

      expect(
        await DbUtils.getPage(db.getDictionaryInfo(), { mapper })
      ).toStrictEqual(['dict1']);

      expect(
        await DbUtils.getPage(db.getDictionaryInfo('user1'), { mapper })
      ).toStrictEqual(['dict2']);

      expect(
        await DbUtils.getPage(db.getDictionaryInfo('user2'), { mapper })
      ).toStrictEqual(['dict3']);
    });

    it('and db.getDictionary opens the expected dictionary', async () => {
      expect(await db.getDictionary('dict1')).toBeTruthy();
      expect(await db.getDictionary('dict2', 'user1')).toBeTruthy();
      expect(await db.getDictionary('dict3', 'user2')).toBeTruthy();

      await expect(db.getDictionary('dict1', 'user1')).rejects.toThrow(
        'Dictionary not exists'
      );
      await expect(db.getDictionary('dict2')).rejects.toThrow(
        'Dictionary not exists'
      );
      await expect(
        async () => await db.getDictionary('dict3', 'user1')
      ).rejects.toThrow('Dictionary not exists');
    });

    it('and db.removeDictionary removes the expected dictionary', async () => {
      await db.removeDictionary('dict1');
      await expect(db.getDictionary('dict1')).rejects.toThrow(
        'Dictionary not exists'
      );

      await db.removeDictionary('dict2', 'user1');
      await expect(db.getDictionary('dict2', 'user1')).rejects.toThrow(
        'Dictionary not exists'
      );

      await db.removeDictionary('dict3', 'user2');
      await expect(db.getDictionary('dict3', 'user2')).rejects.toThrow(
        'Dictionary not exists'
      );

      await expect(db.removeDictionary('dict1')).rejects.toThrow(
        'Dictionary not exists'
      );
    });

    it('and getDictionary() allows to work with exact dictionaries', async () => {
      const dict1 = await db.getDictionary('dict1');
      await dict1.put('A1', [{ description: 'a1', interpretation: 'b1' }]);

      const dict2 = await db.getDictionary('dict2', 'user1');
      await dict2.put('A1', [{ description: 'a2', interpretation: 'b2' }]);

      expect(await DbUtils.getPage(dict1)).toStrictEqual([
        [{ description: 'a1', interpretation: 'b1' }],
      ]);
      expect(await DbUtils.getPage(dict2)).toStrictEqual([
        [{ description: 'a2', interpretation: 'b2' }],
      ]);
    });
  });

  describe('createDictionary', () => {
    it('throws exception when table already exists ', async () => {
      await db.createDictionary({ name: 'dict1', language: 'en' });
      await expect(
        db.createDictionary({ name: 'dict1', language: 'en' })
      ).rejects.toThrow('Dictionary already exists');
    });

    it('overrides table when table already exists and canOverride flag is turned on', async () => {
      const dict1 = await db.createDictionary({
        name: 'dict1',
        language: 'en',
      });
      await dict1.put('A1', []);

      await db.createDictionary({ name: 'dict1', language: 'ru' }, undefined, {
        canOverride: true,
      });

      expect(await DbUtils.getSize(dict1)).toBe(0);
    });
  });
});
