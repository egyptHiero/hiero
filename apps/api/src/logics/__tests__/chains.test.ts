import {
  createDbInstance,
  DB,
  DbTable,
  DbUtils,
  DictionaryItemEntity,
} from '@hiero/db';
import { findChains } from '../chains';

const mapper = (key: string) => key;

describe('chains', () => {
  let db: DB;
  let table: DbTable<DictionaryItemEntity>;

  beforeEach(async () => {
    db = await createDbInstance();
    table = await db.createDictionary({
      description: 'chains',
      language: 'en',
      name: 'chains',
    });
    await DbUtils.update(table, [
      ['A1', []],
      ['A11', []],
      ['A1-A2', []],
      ['A11-A2', []],
      ['A1-A2-A3', []],
      ['A2', []],
      ['A21', []],
      ['A2-A3', []],
      ['A2-A3-A4', []],
      ['A3-A4', []],
      ['A31-A4', []],
    ]);
  });

  afterEach(async () => {
    await db.close();
  });

  it('should return an empty array for not existing key', async () => {
    expect(
      Object.values(await findChains(table, [['B1']], mapper)),
    ).toStrictEqual([]);
  });

  it('should return found chains', async () => {
    expect(
      Object.values(await findChains(table, [['A1']], mapper)),
    ).toStrictEqual(['A1']);

    expect(
      Object.values(await findChains(table, [['A1', 'A2']], mapper)),
    ).toStrictEqual(['A1', 'A1-A2', 'A2']);

    expect(
      Object.values(
        await findChains(table, [['A1', 'A2', 'A1', 'A2']], mapper),
      ),
    ).toStrictEqual(['A1', 'A1-A2', 'A2']);

    expect(
      Object.values(await findChains(table, [['A2', 'A3']], mapper)),
    ).toStrictEqual(['A2', 'A2-A3']);

    expect(
      Object.values(await findChains(table, [['A3']], mapper)),
    ).toStrictEqual([]);

    expect(
      Object.values(
        await findChains(table, [['A1', 'A2', 'A3', 'A4']], mapper),
      ),
    ).toStrictEqual([
      'A1',
      'A1-A2',
      'A1-A2-A3',
      'A2',
      'A2-A3',
      'A2-A3-A4',
      'A3-A4',
    ]);
  });
});
