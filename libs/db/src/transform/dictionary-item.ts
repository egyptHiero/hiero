import { DictionaryItemEntity } from '../entities';
import JSON5 from 'json5';

type TJson = [string, string[], string[]];

export const dictionaryItem2Json = (
  id: string,
  entity: DictionaryItemEntity,
) => {
  return `${JSON5.stringify([id, entity.text, entity.transcription])}\n`;
};

export const json2DictionaryItem = ([id, text, transcription]: TJson): [
  string,
  DictionaryItemEntity,
] => {
  return [id, { text, transcription }];
};
