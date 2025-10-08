import { Transform } from 'node:stream';

export class BlocksTransformer extends Transform {
  private partTranslation = '';
  private parts = [];

  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    const { id, partTranslation } = chunk;
    if (partTranslation) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this._flush(() => {});
      this.partTranslation = partTranslation;
    }
    this.parts.push(id);
    callback();
  }

  _flush(callback) {
    if (this.partTranslation && this.parts.length > 0) {
      this.push([this.parts[0], [this.partTranslation, this.parts]]);
    }
    this.parts = [];
    callback();
  }
}
