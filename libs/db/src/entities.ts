export interface DictionaryInfoEntity {
  name: string;
  description?: string;
  language: string;
  link?: string;
  size?: number;
}

export type DictionaryItemEntity = Array<{
  interpretation: string;
  description?: string;
  transcription?: string;
}>;

export interface SignEntity {
  name: string;
  image?: string;
  imageSize?: string;
  gardinerCodes: string;
  description?: string;
  fontSize?: number;
  dir?: string;
}

export interface TranslationEntity {
  sign: string;
  name: string;
  description?: string;
  text?: string;
  json?: string;
}

export interface RosettaPartEntity {
  concordance?: string;
  image: string;
  analysis: string;
  transliteration: string;
  gloss: string;
  lGloss?: string;
  lGlossWn?: string;
  word: string;
  translation?: string;
  gardinerCodes?: string;
}
