export * from './classification';

export const DELIMITER_NEW_LINE = '\n';
export const DELIMITER_VERTICAL = ':';
export const DELIMITER_HORIZONTAL = '*';
export const DELIMITER_NEAR = '-';

export const SUPPORTED_DELIMITERS = [
  DELIMITER_NEW_LINE,
  DELIMITER_VERTICAL,
  DELIMITER_HORIZONTAL,
  DELIMITER_NEAR,
];

export const SUPPORTED_DELIMITERS_REGEXP = new RegExp(
  `([${SUPPORTED_DELIMITERS}])`,
);
