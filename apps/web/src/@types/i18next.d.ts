import 'i18next';
import 'react-i18next';
import resources from '../locales/en/translation.json';

declare module 'i18next' {
  export interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof resources };
  }
}
