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
  i: Record<string, string>[];
}

// Sign ------------------------------------------------------------------------

export type SignNewDto = {
  name: string;
  image?: string;
  classification: string;
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
};

export type TranslationDto = TranslationNewDto & Identifiable;
