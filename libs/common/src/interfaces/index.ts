/**
 * Description of a dictionary.
 */
export interface DictionaryInfo {
  /** Database name. */
  name: string;
  /** Database description. */
  description?: string;
  /** Database language. */
  language: string;
  /** Original file URL. */
  link?: string;
}

/**
 * Description of a dictionary with type field.
 */
export interface DictionaryMetadata extends DictionaryInfo {
  /** Hint to a loader. */
  type: 'dictionary' | 'hieroglyphs'
}
