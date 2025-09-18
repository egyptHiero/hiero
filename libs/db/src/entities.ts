export interface DictionaryInfoEntity {
  name: string;
  description?: string;
  language: string;
  link?: string;
  size?: number;
}

export type DictionaryItemEntity = {
  text: string[];
  transcription: string[];
};

export interface SignEntity {
  name: string;
  image?: string;
  imageCss?: string;
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
  part?: string;
  image: string;
  transliteration: string;
  translation?: string;
  partTranslation?: string;
  gardinerCodes?: string;
}
