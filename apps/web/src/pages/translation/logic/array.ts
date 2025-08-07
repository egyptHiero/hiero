export const getFromArray = <T>(arr: T[] = [], index: number): T | undefined =>
  arr?.[index];

export const updateArray = <T>(
  arr: Array<T | undefined> = [],
  index: number,
  value: T | undefined,
): Array<T | undefined> => {
  arr[index] = value;

  return arr;
};

export const parseJson = <T>(value: string | undefined, defaultValue: T): T => {
  try {
    return value ? JSON.parse(value) : defaultValue;
  } catch {
    return defaultValue;
  }
};
