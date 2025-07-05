import { DB } from '../types';
import { createDbInstance } from '../db';
import { SignEntity } from '../entities';

const SET1: Record<string, SignEntity> = {
  a1: {
    classification: 'b1',
    name: 'c1',
  },
  a2: {
    classification: 'b2',
    name: 'c2',
  },
};

describe('DB-signs', () => {
  let db: DB;

  beforeEach(async () => {
    db = await createDbInstance();
  });

  afterEach(() => {
    db.close();
  });

  it(`public signs are not accessible from users'`, async () => {
    await db.getSigns().batch(
      Object.entries(SET1).map(([key, value]) => ({
        key,
        value,
        type: 'put',
      }))
    );

    expect(await db.getSigns().get('a1')).toStrictEqual({
      classification: 'b1',
      name: 'c1',
    });

    expect(await db.getSigns('user1').get('a1')).toBeUndefined();
  });

  it(`user signs are not accessible from public`, async () => {
    await db.getSigns('user1').batch(
      Object.entries(SET1).map(([key, value]) => ({
        key,
        value,
        type: 'put',
      }))
    );

    expect(await db.getSigns('user1').get('a1')).toStrictEqual({
      classification: 'b1',
      name: 'c1',
    });

    expect(await db.getSigns().get('a1')).toBeUndefined();
  });
});
