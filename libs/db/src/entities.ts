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
