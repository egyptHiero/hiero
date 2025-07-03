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

Пришлось написать приложение dictionary-parser. Добавляем приложение в Nx и подключаем [pdf.js-extract]
(https://github.com/ffalt/pdf.js-extract).

```bash
$ npx nx g @nx/node:application apps/dictionary-parser
$ npm i -D pdf.js-extract
```

Из словаря Вигуса добыть данные оказалось сравнительно легко, данные а нем расположены построчно. А вот с
табличным видом пришлось повозиться. В результате я написал утилиту calculateBoundaries, которая
определяет примерные границы столбцов в таблице. Примерные, потому что тесктовый блок в pdf может быть
размещен произвольным образом и позиционирование в нём тоже может быть любым.

Получив приблизительные границы колонок, я распарсил, наконец, и два оставшихся файла.

## Потоки

и ndjson

## Аргументы командной строки

Далее, добавил передачу аргументы из командной строки. В Nx передать аргументы в nodejs приложение
можно только в формате --args:

```bash
$ nx serve my-app --args="param1=value1".
```

В [npm](https://docs.npmjs.com/cli/v10/commands/npm-run-script) аргументы для скрипта
отделяются разделителем --.

```bash
$ npm run app -- --param1=yes --param2=no
```

Мне показалось неудобным передавать параметры в стиле Nx через --args и я добавил скрипт runner для
маппинга параметров в формат Nx. Для парсинга аргументов подключил минималистичную библиотеку
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

В Nx, начиная с версии 21, добавился [интерактивный UI](https://nx.dev/recipes/running-tasks/terminal-ui).
Мне удобнее работать в консоле по-старинке, поэтому отключаю его в скрипте через `env` переменную `NX_TUI`

```typescript
execSync(`nx serve dictionary-parser ${args}`, {
    stdio: 'inherit',
    env: {...process.env, 'NX_TUI': 'false'},
});
```

## Показ прогресса выполнения


