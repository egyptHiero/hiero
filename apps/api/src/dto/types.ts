// Common ----------------------------------------------------------------------

export interface PageDto<T> {
  items: T[];
  next?: string;
}

export type Identifiable = {
  id: string;
};

export interface ParamIdFilterDto {
  id: string;
}

export interface ListFilterDto {
  /**
   * @description starts list after this element
   */
  from?: string;
  /**
   * @description starts list after this element
   */
  pageSize?: number;
}

export interface QueryFilterDto extends ListFilterDto {
  /**
   * @description query string
   */
  query?: string;
}

// Dictionary ------------------------------------------------------------------

export interface DictionaryInfoDto extends Identifiable {
  description?: string;
  language: string;
  link?: string;
  size?: number;
}

export interface DictionaryItemDto extends Identifiable {
  text: string[];
  transcription?: string[];
}

export interface DictionaryChainsParams {
  dictionaries: string[];
  hieroes: string[][];
}

export interface DictionaryChainsDto {
  chains: Record<string, Record<string, Omit<DictionaryItemDto, 'id'>>>;
  warnings?: Record<string, string>;
}

// Sign ------------------------------------------------------------------------

export type SignNewDto = {
  name: string;
  image?: string;
  imageCss?: string;
  gardinerCodes: string;
  description?: string;
  fontSize?: number;
  dir?: string;
};

export type SignDto = SignNewDto & Identifiable;

// Translations -----------------------------------------------------------------
export type TranslationNewDto = {
  sign: string;
  name: string;
  description?: string;
  text?: string;
  json?: string;
};

export type TranslationDto = TranslationNewDto & Identifiable;

// Rosetta -----------------------------------------------------------------
export interface RosettaPartQuery extends QueryFilterDto {
  blankOnly?: boolean;
}

export interface RosettaPartDto extends Identifiable {
  part?: string;
  image: string;
  transliteration: string;
  translation?: string;
  partTranslation?: string;
  gardinerCodes?: string;
}

export interface RosettaBlocksDto extends Identifiable {
  parts: RosettaPartDto[];
  translation: string;
  json?: string;
}

export interface RosettaPartCodesBody {
  codes?: string;
}
