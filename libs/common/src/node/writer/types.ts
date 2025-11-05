export type JSON5SingleEntity = [string, string[]];
export type JSON5Entity = [string, string[], ...string[][]];

export type JsonPrimitive = string | number | boolean | null | JsonPrimitive[];

export type Dto = {
  id: string;
} & Record<string, JsonPrimitive>;
