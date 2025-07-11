// Common ----------------------------------------------------------------------
export interface PageDto<T> {
  items: T[];
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

export interface DictionaryListFilterDto extends ListFilterDto {
  // todo: remove
  type?: string;
}

export interface DictionaryChunkParamFilterDto extends ParamIdFilterDto {
  hieroes: string;
}

export interface DictionaryInfoDto extends Identifiable {
  description?: string;
  language: string;
  link?: string;
  size?: number;
}

export interface DictionaryItemDto extends Identifiable {
  i: Record<string, string>;
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

// Hieroglyphs -----------------------------------------------------------------

