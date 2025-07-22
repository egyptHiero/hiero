export * from './classification';

export const SUPPORTED_DELIMITERS = '\n:*-';
export const SUPPORTED_DELIMITERS_REGEXP = new RegExp(
  `([${SUPPORTED_DELIMITERS}])`,
);
export const [
  DELIMITER_NEW_LINE,
  DELIMITER_VERTICAL,
  DELIMITER_HORIZONTAL,
  DELIMITER_NEAR,
] = SUPPORTED_DELIMITERS;
