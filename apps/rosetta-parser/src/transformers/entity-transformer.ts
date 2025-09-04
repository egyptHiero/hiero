import { Transform } from 'node:stream';

const unwrap = (value?: string[]) => {
  if (value?.length > 1) {
    throw `${value} contains more then one element`;
  }

  return value?.[0];
};

const joinWithSpace = (value?: string[]) => {
  return value
    ?.map((v) => v.trim())
    .filter(Boolean)
    .join(' ');
};

export class EntityTransformer extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback): void {
    const [
      id,
      part,
      image,
      ,
      transliteration,
      ,
      ,
      translation,
      ,
      partTranslation,
      gardinerCodes,
    ] = chunk as Array<string[]>;

    if (id) {
      this.push({
        id: unwrap(id),
        part: joinWithSpace(part),
        image: unwrap(image),
        transliteration: transliteration?.map((v) => v.trim()).join(''),
        translation: unwrap(translation),
        partTranslation: joinWithSpace(partTranslation),
        gardinerCodes: unwrap(gardinerCodes),
      });
    }
    callback();
  }
}
