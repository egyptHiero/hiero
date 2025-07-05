---
outline: deep
---

# Глава 7. Загрузка данных в базу

Добавим еще одно приложение для загрузки подготовленных данных из `ndjson` файлов. В каждом файле в первой строке
хранится метаинформация, в которой указан в том числе тип. Поэтому приложение без параметров, процессит все файлы из
папки ./data/ndjson

```shell
$ npx nx g @nx/node:application apps/dictionary-loader
NX  Generating @nx/node:application
✔ Which linter would you like to use? · eslint
✔ Which unit test runner would you like to use? · none
✔ Which end-to-end test runner would you like to use? · none
✔ Which framework do you want to use? · none

npx nx g vitest --project=dictionary-loader
```

Запустив приложение, получаем проинициализированную базу данных
```shell
$ npx nx serve dictionary-loader
✓ file ancient_en.ndjson was successfully loaded to db.
✓ file hieroglyphs-description_en.ndjson was successfully loaded to db.
✓ file hieroglyphs_en.ndjson was successfully loaded to db.
✓ file vygus_en.ndjson was successfully loaded to db.


```
