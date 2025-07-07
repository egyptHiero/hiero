import {dbPromise, fillTableFromFile} from "../loader";
import {DbUtils} from '@hiero/db';
import {Readable} from "node:stream";

describe('loader', () => {
  describe('fillTableFromFile', () => {
    it('should fill hieroglyphs table', async () => {
      vi.mock('node:fs', async () => {
        const actualFs = await vi.importActual<typeof import('node:fs')>('node:fs');

        return {
          ...actualFs,
          createReadStream: vi.fn(() => {
            return new Readable({
              read() {
                this.push('{"name":"hieroglyphs-description", "type": "hieroglyphs", "language":"en" }\n');
                this.push('["A37","man in vessel"]\n');
                this.push('["A39","man on two giraffes"]\n');
                this.push(null);
              }
            });
          })
        }
      });

      await fillTableFromFile('dummy');
      const db = await dbPromise;
      expect(await DbUtils.getPage(db.hieroglyphs)).toStrictEqual(["man in vessel", "man on two giraffes"]);
    });
  });
});
