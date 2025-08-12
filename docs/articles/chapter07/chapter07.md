---
outline: deep
---

# Глава 7. Инициализация базы данных

С помощью приложения `dictionary-parser` мы распарсили словари, но в файлах присутсвуют повторяющиеся ключи.
Нужно сгруппировать записи по уникальными ключам. Для этого добавим приложение `dictionary-comb`.

### dictionary-comb

```bash
$ npx nx g @nx/node:application apps/dictionary-comb
NX  Generating @nx/node:application
✔ Which linter would you like to use? · eslint
✔ Which unit test runner would you like to use? · none
✔ Which end-to-end test runner would you like to use? · none
✔ Which framework do you want to use? · none
```

И настроем vitest для запуска тестов -
```bash
npx nx g vitest --project=dictionary-comb
````

Можно было и не выносить sort и reduce в отдельное приложение, а сделать это при загруке файла, но сортировка плохо
сочетается с потоковой обработкой данных.

### dictionary-loader
Теперь, файлы "причесаны" и готовы для загрузки в базу. Добавим в проект еще одно приложение - `dictionary-loader`.

В каждом файле в первой строке хранится метаинформация, в которой указан в том числе тип данных.
Поэтому, приложению не нужны параметры, оно процессит все файлы из папки `./data/ndjson`.

Запустив приложение, получим проинициализированную базу данных:

```bash
$ npx nx serve dictionary-loader
✓ file ancient_en.ndjson was successfully loaded to db.
✓ file hieroglyphs-description_en.ndjson was successfully loaded to db.
✓ file hieroglyphs_en.ndjson was successfully loaded to db.
✓ file vygus_en.ndjson was successfully loaded to db.


```
