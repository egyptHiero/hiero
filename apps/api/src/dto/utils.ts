import {DictionaryInfoDto, DictionaryItemDto, SignDto,} from './index';
import {DictionaryInfoEntity, DictionaryItemEntity, SignEntity} from '@hiero/db';

export const toPageDto = <T>(items: T[]) => ({items});

export const toDictionaryInfoDto = (
  id?: string,
  entity?: DictionaryInfoEntity
): DictionaryInfoDto | undefined =>
  id && entity
    ? {
      id,
      ...entity,
    }
    : undefined;

export const toDictionaryItemDto = (
  id?: string,
  entity: DictionaryItemEntity = []
): DictionaryItemDto | undefined =>
  id
    ? {
      id,
      i: entity.reduce<Record<string, string>>(
        (acc, {interpretation, description}) => {
          acc[interpretation] = description ?? '';
          return acc;
        },
        {}
      ),
    }
    : undefined;

export const toSignDto = (
  id?: string,
  entity?: SignEntity
): SignDto | undefined =>
  id && entity
    ? {
      id,
      ...entity,
    }
    : undefined;
