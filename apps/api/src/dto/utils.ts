import {
  DictionaryInfoDto,
  DictionaryItemDto,
  RosettaPartDto,
  SignDto,
  TranslationDto,
} from './index';
import {
  DictionaryInfoEntity,
  DictionaryItemEntity,
  RosettaPartEntity,
  SignEntity,
  TranslationEntity,
} from '@hiero/db';

export const toPageDto = <T>(v: T) => v;

export const toDictionaryInfoDto = (
  id?: string,
  entity?: DictionaryInfoEntity,
): DictionaryInfoDto | undefined =>
  id && entity
    ? {
        id,
        ...entity,
      }
    : undefined;

export const toDictionaryItemDto = (
  id?: string,
  entity?: DictionaryItemEntity,
): DictionaryItemDto | undefined => {
  return id && entity
    ? {
        id,
        text: entity.text ?? [],
        transcription: entity.transcription ?? [],
      }
    : undefined;
};

export const toSignDto = (
  id?: string,
  entity?: SignEntity,
): SignDto | undefined =>
  id && entity
    ? {
        id,
        ...entity,
      }
    : undefined;

export const toTranslationDto = (
  id?: string,
  entity?: TranslationEntity,
): TranslationDto | undefined =>
  id && entity
    ? {
        id,
        ...entity,
      }
    : undefined;

export const toRosettaPartDto = (
  id?: string,
  entity?: RosettaPartEntity,
): RosettaPartDto | undefined => {
  return id && entity
    ? {
        id,
        ...entity,
      }
    : undefined;
};
