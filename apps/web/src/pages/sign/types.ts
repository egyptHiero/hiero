export type TCurrent = [number, number];

export type THieroChange = {
  hiero: string;
  variant:
    | 'hiero'
    | 'hiero-left'
    | 'hiero-right'
    | 'left-divider'
    | 'right-divider';
};

export type TLines = Array<{
  codes: string;
  hieroes: string[];
  delimiters: string[];
}>;
