export type TCurrent = [number, number];

export type THiero = { value: string; variant: 'left' | 'right' | 'hiero' };

export type TLines = Array<{
  codes: string;
  hieroes: string[];
  delimiters: string[];
}>;

export type TChangeHiero = (
  value: string,
  variant: 'left' | 'right' | 'hiero',
) => void;
