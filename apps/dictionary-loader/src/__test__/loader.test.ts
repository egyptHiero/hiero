import {dbPromise, fillTableFromFile} from "../loader";
import {DbUtils} from '@hiero/db';
import {Readable} from "node:stream";

const getData = vi.fn<() => string[]>();

vi.mock('node:fs', async () => {
  const actualFs = await vi.importActual<typeof import('node:fs')>('node:fs');

  return {
    ...actualFs,
    createReadStream: vi.fn(() => {
      return new Readable({
        read() {
          getData().forEach(line => this.push(`${line}\n`));
          this.push(null);
        }
      });
    })
  }
});

describe('loader', () => {
  describe('fillTableFromFile', () => {

    it('should fill hieroglyphs table', async () => {
      getData.mockReturnValue([
        '{"name":"hieroglyphs-description", "type": "hieroglyphs", "language":"en" }',
        '["A37","man in vessel"]',
        '["A39","man on two giraffes"]',

      ])
      await fillTableFromFile('dummy');
      const db = await dbPromise;
      expect(await DbUtils.getPage(db.hieroglyphs)).toStrictEqual(["man in vessel", "man on two giraffes"]);
    });

    it('should fill dictionary with all the values', async () => {
      getData.mockReturnValue([
        '{"name":"test1", "type": "dictionary", "language":"en" }',
        '["A1",["a1-interpretation"]]',
        '["A2",["a2-interpretation-1", "a2-description-1"],["a2-interpretation-2", "a2-description-2"]]',
      ]);
      await fillTableFromFile('dummy');
      const db = await dbPromise;
      expect(await db.getDictionaryInfo().get('test1')).toStrictEqual({
        "name": "test1",
        "language": "en"
      });
      expect(await DbUtils.getPage(await db.getDictionary('test1'), {mapper: (key, value) => ({[key]: value})})).toStrictEqual([
        {
          A1: [{
            interpretation: "a1-interpretation",
          }]
        },
        {
          A2: [{
            interpretation: "a2-interpretation-1",
            description: 'a2-description-1'
          }, {
            interpretation: "a2-interpretation-2",
            description: 'a2-description-2'
          }]
        }
      ]);
    });
  });
});
