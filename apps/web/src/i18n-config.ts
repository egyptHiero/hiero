import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import ChainedBackend, {ChainedBackendOptions} from 'i18next-chained-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next';
import defaultTranslation from './locales/en/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const defaultLanguage = 'en';

i18next
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<ChainedBackendOptions>({
    partialBundledLanguages: false,
    returnNull: false,
//    debug: true,
    fallbackLng: defaultLanguage,
    saveMissing: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend({[defaultLanguage]: {translation: defaultTranslation}}),
      ],
      backendOptions: [
        {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        {}
      ],
    },
  });

export {i18next};
