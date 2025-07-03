---
outline: deep
---

# Глава 5. Парсим словари

Мне удалось найти только два словаря египетских иероглифов. Оба они в pdf-формате:

- [Dictionary of Ancient Egyptian Hieroglyphs](https://www.ancient-egypt.co.uk/transliteration/dictionary.htm)
- [Mark Vygus. Ancient Egyptian Hieroglyphic Dictionary, 2018](https://rhbarnhart.net/VYGUS_Dictionary_2018.pdf)

и еще сохранил в pdf-формате страничку из
википедии [List of Egyptian hieroglyphs](https://en.wikipedia.org/wiki/List_of_Egyptian_hieroglyphs).
Эти файлы я положил в папку /resources в корне проекта.

Вначале я думал, что из pdf будет легко получить информацию с помощью консольных утилит вроде pdftotext. Но
все опять оказалось сложнее чем казалось...

Пришлось написать приложение `dictionary-parser`.

### Добавление `Node.js` приложения

В основе `Nx` лежит система плагинов. Добавим плагин для `Node.js` и запустим визард для создания нового приложения -

```bash
$ npm i -D @nx/node
$ npx nx g @nx/node:application apps/dictionary-parser

 NX  Generating @nx/node:application

✔ Which linter would you like to use? · eslint
✔ Which unit test runner would you like to use? · none
✔ Which end-to-end test runner would you like to use? · none
✔ Which framework do you want to use? · none
```

Я не стал создавать e2e-тесты, а для юнит-тестов я хочу использовать [vistest](https://vitest.dev). Он работает
значительно
быстрее, чем `jest`. Добавляем `vitest` в проект, с помощью
плагина [vite](https://nx.dev/technologies/build-tools/vite/api/generators/vitest) -

```bash
$ npm i -D @nx/vite
$ npx nx g vitest --project=dictionary-parser
```

И добавим общую библиотеку common

```bash
$ npx nx g @nx/node:library libs/common
$ npx nx g vitest --project=common
```

### Парсинг Pdf

Читать данные из pdf буду с помощью плагина [pdf.js-extract](https://github.com/ffalt/pdf.js-extract).

```bash
$ npm i pdf.js-extract arg
```

Получить данные просто, сложнее их интерпретировать - определить, где начало строки и где конец. Со словарем Вигуса
все оказалось сравнительно легко, данные а нем расположены построчно. А вот с табличным видом пришлось
повозиться. В результате я написал утилиту calculateBoundaries, которая определяет примерные границы столбцов в таблице.
Примерные, потому что тесктовый блок в pdf может быть размещен произвольным образом и позиционирование в нём тоже может
быть любым. Получив приблизительные границы колонок, я распарсил, наконец, и два оставшихся файла.

## Потоки (Streams)

Хотя библиотека `pdf.js-extract` не умеет работать с потоками, но их, однозначно, стоит использовать для дальнейшей
обработки данных.
Создаем PassThrough поток для чтения данных, далее используем
[pipeline](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options)
для конвейерной обработки.

Формат `JSON` плохо подходит для потоковой обработки сериализованных объектов. К счастью, есть формат
[`NDJSON`](https://github.com/ndjson/ndjson.js), в котором каждая строка это json. Такой формат удобно читать и
записывать в него по частям.

```bash
$ npm i ndjson
```

## Аргументы командной строки

Далее, добавил передачу аргументы из командной строки. В `Nx` передать аргументы в `Node.js` приложение
можно только в формате --args:

```bash
$ nx serve my-app --args="param1=value1".
```

В [npm](https://docs.npmjs.com/cli/v10/commands/npm-run-script) аргументы для скрипта
отделяются разделителем --.

```bash
$ npm run app -- --param1=yes --param2=no
```

Мне показалось неудобным передавать параметры в стиле `Nx` через `--args` и я добавил скрипт `runner` для
маппинга параметров в формат `Nx`. Для парсинга аргументов подключил минималистичную библиотеку
[arg](https://github.com/vercel/arg).

```bash
$ npm run parse-dictionary -- ancient --from=2 --to=5 --calculate-boundaries
```

::: details Параметры командной строки

```bash
PDF Dictionary Parser
Extracts information from PDF files of following types - ancient, vygus, heroes

Usage:
	npm run parse-dictionary -- name [options]
 or
	npm run parse-dictionary -- name1 name2 [--debug]
Options:
	--from <number>               First page to process
	--to <number>                 Last page to process
	-d, --debug                   Enable debug mode
	-b, --calculate-boundaries    Only print columns boundaries

Examples:
	# Process all the dictionaries
	npm run parse-dictionary -- ancient vygus heroes

	# Process 'ancient' dictionary from page 2 to 5 with debug
	npm run parse-dictionary -- ancient --from=2 --to=5 --debug
	npm run parse-dictionary -- ancient --from=2 --to=5 -d

	# Calculates the ancient's boundaries from page 2 to 5
	npm run parse-dictionary -- ancient --from=2 --to=5 --calculate-boundaries
	npm run parse-dictionary -- ancient --from=2 --to=5 -b
```

:::

## Terminal UI

В `Nx`, начиная с версии 21, добавился [интерактивный UI](https://nx.dev/recipes/running-tasks/terminal-ui).
Мне удобнее работать в консоле по-старинке, поэтому отключаю его в скрипте через `env` переменную `NX_TUI`

```typescript
execSync(`nx serve dictionary-parser ${args}`, {
  stdio: 'inherit',
  env: {...process.env, 'NX_TUI': 'false'},
});
```

## Показ прогресса выполнения

Чуть улучшим вывод в консоль - будем перезаписывать сообщения и добавим анимацию прогресса загрузки. Для этого
подключим библиотеку [log-update](https://github.com/sindresorhus/log-update) для анимации вывода на терминале и
добавим [цвета](https://github.com/medikoo/cli-color).

```bash
npm i log-update cli-color
npm i -D @types/cli-color
```
Строки перезаписываются по ключу, для логирования файловых операций используем в качесве ключа имя файла.
Для удобства вызова, обернул логирование в Proxy.

```typescript
consoleProgress.fileName1.progress('stat reading file1...');
consoleProgress.fileName2.progress('stat reading file2...');
consoleProgress.fileName1.progress('continue reading file1...');
consoleProgress.fileName2.success('finished reading file2...');
consoleProgress.fileName1.success('finished reading file1...');
```

::: details Пример анимации в терминале
<video autoplay=autoplay controls=controls src="./Screencast1.mp4"/>
:::

## Многопоточность (worker threads)

К сожалению, библиотека `pdf.js-extract` не использует неблокирующие вызовы и при парсинге pdf она полностью
блокирует выполнение другого кода, поэтому спиннер замерзает и файлы загружаются последовательно.
Нужно это исправить.

Обычно, `Node.js` выполняет JavaScript-код в однопоточном режиме. Но, начиная с версии
[v11.7.0](https://nodejs.org/en/blog/release/v11.7.0/) была добавлена
официальная поддержка [worker_threads](https://nodejs.org/api/worker_threads.html).
Это поволяет запускать потоки воркеров в изолированном контексте, с возможностью отправлять сообщения в главный
процесс.

