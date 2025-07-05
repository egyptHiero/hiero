import { AbstractSublevel } from 'abstract-level/types/abstract-sublevel';
import {
  DictionaryInfoEntity,
  DictionaryItemEntity,
  SignEntity
} from './entities';

export type TDbFormat = string | Buffer | Uint8Array;
// todo: remove any
export type DbTable<T> = AbstractSublevel<any, TDbFormat, string, T>;

type CreateDictionaryOptions = {
  canOverride: boolean;
}

/**
 * DB Layer
 */
export type DB = {
  /**
   * Table of hieroglyphs.
   */
  hieroglyphs: DbTable<string>;

  /**
   * Returns table of signs.
   *
   * @param user      - private user's table
   */
  getSigns(user?: string): DbTable<SignEntity>;
  /**
   * Returns table of dictionaries information.
   *
   * @param user      - private user's table
   */
  getDictionaryInfo(user?: string): DbTable<DictionaryInfoEntity>;
  /**
   * Returns table of a dictionary.
   *
   * @param name      - dictionary name
   * @param user      - private user's table
   */
  getDictionary(name: string, user?: string): Promise<DbTable<DictionaryItemEntity>>;
  /**
   * Creates new dictionary.
   *
   * @param info                - dictionary info
   * @param user                - private user's table
   * @param options             - options
   * @param options.canOverride - can override existing table
   */
  createDictionary(info: DictionaryInfoEntity, user?: string, options?: Partial<CreateDictionaryOptions>): Promise<DbTable<DictionaryItemEntity>>;
  /**
   * Removes the dictionary.
   *
   * @param name                - dictionary name
   * @param user                - private user's table
   */
  removeDictionary(name: string, user?: string): Promise<void>;

  /**
   * Closes database instance.
   */
  close(): Promise<void>;
};
