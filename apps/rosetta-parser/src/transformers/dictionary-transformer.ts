import { Transform } from 'node:stream';
import { normalizeHieroes } from '@hiero/db';

export class DictionaryTransformer extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    const { gardinerCodes, translation, transliteration } = chunk;
    if (gardinerCodes) {
      this.push([
        normalizeHieroes(gardinerCodes),
        [translation, undefined, transliteration],
      ]);
    }
    callback();
  }
}
