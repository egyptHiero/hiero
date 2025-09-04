import { Transform } from 'node:stream';

export class PartsTransformer extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    const {
      id,
      part,
      image,
      transliteration,
      translation,
      partTranslation,
      gardinerCodes,
    } = chunk;
    this.push([
      id,
      [
        part,
        image,
        transliteration,
        translation,
        partTranslation,
        gardinerCodes,
      ],
    ]);
    callback();
  }
}
