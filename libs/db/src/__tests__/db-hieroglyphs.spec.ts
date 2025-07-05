import { createDbInstance } from '../db';
import { DB } from '../types';

const SET1 = {
  A1: 'seated man',
  A2: 'man with hand to mouth',
  A3: 'man sitting on heel',
};

describe('DB-hieroglyphs', () => {
  let db: DB;

  beforeEach(async () => {
    db = await createDbInstance();
  });

  afterEach(() => {
    db.close();
  });

  it('get() should find certain value by key', async () => {
    await db.hieroglyphs.batch(
      Object.entries(SET1).map(([key, value]) => ({ key, value, type: 'put' }))
    );

    expect(await db.hieroglyphs.get('A2')).toBe('man with hand to mouth');
  });
});
