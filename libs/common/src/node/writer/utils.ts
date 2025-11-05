import { Dto, JSON5Entity, JSON5SingleEntity } from './types';

export const isSingleJSON5Entity = (entity: JSON5Entity) => {
  const [, , values] = entity;

  return !values;
};

export const Dto2JSON5Entity = <T extends Dto>(
  dto: T,
  keys: Array<keyof T>,
): JSON5SingleEntity => {
  return [
    dto.id,
    keys.map((key) => dto[key]).map((value) => JSON.stringify(value)),
  ];
};

export const JSON5SingleEntity2Dto = (
  entity: JSON5SingleEntity,
  keys: string[],
): Dto => {
  const [id, values] = entity;

  if (!isSingleJSON5Entity(entity)) {
    throw new Error(`Entity is not single: ${id}`);
  }

  return {
    ...values.reduce((acc, value, n) => {
      acc[keys[n]] = value;

      return acc;
    }, {}),
    id,
  };
};

export const splitJSON5Entity2Single = (
  entity: JSON5Entity,
): JSON5SingleEntity[] => {
  const [id, ...allValues] = entity;

  return allValues.map((values) => [id, values]);
};
