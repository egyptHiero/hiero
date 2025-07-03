import { Dictionary } from '../types';
import { getAncientProcessorsWithOptions } from './ancient-egypt-parser';
import { getVygusProcessorsWithOptions } from './vygus-parser';
import { getHieroglyphsProcessorsWithOptions } from './hieroglyphs-parser';
import { ParserOptions } from './types';
import { extract } from '../utils/extractor';
import { getResource } from '../resource-names';

const getProcessorsWithOptions = (
  dictionary: Dictionary,
  options: ParserOptions
) => {
  switch (dictionary) {
    case 'ancient':
      return getAncientProcessorsWithOptions(options);
    case 'hieroes':
      return getHieroglyphsProcessorsWithOptions(options);
    case 'vygus':
      return getVygusProcessorsWithOptions(options);
  }
};

export const parseDictionary = (
  dictionary: Dictionary,
  parserOptions: ParserOptions
) => {
  const { processors, options } = getProcessorsWithOptions(
    dictionary,
    parserOptions
  );
  return extract(getResource(dictionary), options, ...processors);
};
