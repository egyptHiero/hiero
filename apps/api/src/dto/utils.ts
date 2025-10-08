import { DictionaryItemDto, Identifiable, RosettaPartDto } from './index';
import { DictionaryItemEntity, RosettaPartEntity } from '@hiero/db';

export const toPageDto = <T>(v: T) => v;

export const toIdentifiableDto = <T>(
  id?: string,
  entity?: T,
): (Identifiable & T) | undefined =>
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
