export const ROUTES = {
  SIGN: '/sign/:id',
  SIGN_LIST: '/sign',
  TRANSLATION: '/translation/:id/:sign?',
  TRANSLATION_LIST: '/translation',
  DICTIONARY: '/dictionary/:name',
  DICTIONARY_LIST: '/dictionary',
  ROSETTA_LIST: '/rosetta',
  ROSETTA_PART: '/rosetta/:id',
  ROSETTA_BLOCK: '/rosetta-block/:id',
  ROSETTA_BLOCK_LIST: '/rosetta-block',
  ABOUT: '/about',
} as const;
