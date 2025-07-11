### Интернализация

Хорошо, когда приложение имеет возможность для выбора языка. Добавим интернализацию (сокращенно пришется `i18n`).
Наверное, самый популярный i18n-фреймворк это [i18next](https://www.i18next.com/).

```bash
$ npm i i18next react-i18next i18next-browser-languagedetector `
  `i18next-http-backend i18next-chained-backend `
  `i18next-resources-to-backend i18next-parser
```

Добавим конфиг `i18next-parser.config.ts` в корень нашего воркспейса.
В параметре `keepRemoved` можно перечислить ключи, которые заданы неявно и могут быть удалены при генерации ключей
перевода.

Команда `npx i18next` сгенерит локализованные ресурсы, содержащие все найденные в приложении ключи.

Теперь подключим настройки для локализации приложения - файл `apps/web/src/i18n-config.ts`

- `LanguageDetector` - определяет язык из последнего выбранного или настроек браузера.
- `ChainedBackend` - позволяет объеденить в цепочку несколько бекендов.
- `initReactI18next` - добавляет поддержку React.

В нашей цепочке два бэкенда:

- `HttpBackend` - запросит ресурсы по сети (/locales/{{lng}}/{{ns}}.json)
- `resourcesToBackend` - добавляет в бандл дефолтную интернационализацию на случай поломки локализации по-сети.

Когда приложение EgyptHiero станет популярным и будет переведено на десятки языков, размер бандла даже не увеличится.

Мы добавили импорт json-файла, нужно включить опцию `resolveJsonModule` в настройках `TSConfig`:

```
"resolveJsonModule": true
```

Подключим к приложению

```tsx
import {i18next} from './i18n-config';

<I18nextProvider i18n={i18next}>
  <App/>
</I18nextProvider>
```

Загружая `i18next` из конфига мы запускаем иницализацию, но не дожидаемся, когда она закончится.
Поэтому, нельзя использовать функцию перевода из ~~`import { t } from "i18next";`~~, она может быть вызывана до
окончания инициализации.

Чтобы было удобнее пользоваться и проверять типы ключей, добавим тайпинг `@types/i18next.d.ts`

```typescript
import 'i18next';
import 'react-i18next';
import resources from '../locales/en/translation.json';

declare module 'i18next' {
  export interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: typeof resources };
  }
}
```

Осталось прописать прокси в `vite.config.ts` и настроить бэкенд. В `Nx` чтобы скопировать файл из одного проекта в
другой можно использовать assets в настройках билда:

```json
{
  "executor": "@nx/esbuild:esbuild",
  "options": {
    "assets": [
      {
        "input": "apps/web/src/locales",
        "output": "./locales",
        "glob": "**/translation.json"
      }
    ]
  }
}
```

В проекте `apps/api` подключим статический сервер и бдуем раздавать переведенные ресурсы из `assets`.

```bash
$ npm i fastify-static
```

