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
  classification: string;
  description?: string;
  fontSize?: number;
  dir?: string;
}

export interface InterpretationEntity {
  hieroes: string[];
  description?: string;
}
