import { Dictionary } from './types';
import path from 'node:path';
import {RESOURCES_DIR} from "@hiero/common";

const getFileName = (dictionary: Dictionary) => {
  switch (dictionary) {
    case 'ancient':
      return 'ancient_egypt_dictionary.pdf';
    case 'hieroes':
      return 'List_of_Egyptian_hieroglyphs.pdf';
    case 'vygus':
      return 'VYGUS_Dictionary_2018.pdf';
  }
};

export const getResource = (dictionary: Dictionary) => {
  return path.join(RESOURCES_DIR, getFileName(dictionary));
};
