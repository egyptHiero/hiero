export const ROUTES = {
  SIGN: '/sign/:id',
  SIGN_LIST: '/sign',
  TRANSLATION: '/translation/:id/:sign?',
  TRANSLATION_LIST: '/translation',
  DICTIONARY: '/dictionary/:name',
  DICTIONARY_LIST: '/dictionary',
  ABOUT: '/about',
} as const;
