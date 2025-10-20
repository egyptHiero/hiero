export const ROUTES = {
  ABOUT: '/about',
  DICTIONARY: '/dictionary/:name',
  DICTIONARY_LIST: '/dictionary',
  ROSETTA_BLOCK: '/rosetta-block/:id',
  ROSETTA_BLOCK_LIST: '/rosetta-block',
  ROSETTA_PART: '/rosetta-part/:id',
  ROSETTA_PART_LIST: '/rosetta-part',
  SIGN: '/sign/:id',
  SIGN_LIST: '/sign',
  TRANSLATION: '/translation/:id/:sign?',
  TRANSLATION_LIST: '/translation',
} as const;
