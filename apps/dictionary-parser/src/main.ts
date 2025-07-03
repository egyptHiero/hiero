import { params } from './parameters';
import { calculateBoundaries } from './pdf-table-boundaries';
import { parseDictionary } from './parsers';
import { getResource } from './resource-names';

params.dictionaries.forEach((dictionary) => {
  if (params.calculateBoundaries) {
    void calculateBoundaries(getResource(dictionary), params.from, params.to);
  } else {
    void parseDictionary(dictionary, params);
  }
});
