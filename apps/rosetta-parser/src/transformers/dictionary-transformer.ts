import { Transform } from 'node:stream';

export class DictionaryTransformer extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    const { gardinerCodes, translation, transliteration } = chunk;
    if (gardinerCodes) {
      this.push([gardinerCodes, [translation, undefined, transliteration]]);
    }
    callback();
  }
}
