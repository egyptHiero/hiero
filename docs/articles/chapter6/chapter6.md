---
outline: deep
---

# Глава 6. База данных

Для хранения иероглифов подойдет любое key-value хранилище. Мне
нравится [LevelDB](https://github.com/Level/level). Это даже не одна база, а целая [экосистема]
(https://github.com/Level/awesome) баз, библиотек и утилит.

Для проекта буду использовать `classic-level` и `memory-level` для тестов. Помимо словарей иероглифов нужно
будет хранить таблички с иероглифами и переводы. Я собираюсь хранить все данные в `classic-level` и хотя он не
поддерживает индексы напрямую, но их можно будет подключить позже.

Создаем библиотеку, добавляем npm-зависимости:

```shell
$ npx nx g @nx/js:lib libs/db
✔ Which bundler would you like to use to build the library? Choose 'none' to skip build setup. · none~~~~
✔ Which linter would you like to use? · eslint
✔ Which unit test runner would you like to use? · vitest

$ npm i classic-level memory-level short-unique-id
```

## LevelDb

В базе нет классических таблиц, есть `sublevel` - изолированное пространство ключей.

## Устройство
Заведем `sublevels` для сущностей
- `hieroglyphs` - иероглифовы
- `signs` -  таблички с иероглифами
- `dictionaries` - словари (сейчас только ancient и vygus)
- `translations` - пользовательские переводы

`signs` и `dictionaries` работают как на публичном уровне, так и на пользовательском, а `translations`
только на пользовательском.

`dictionaries` - это таблица таблиц - есть добавлять и удалять словари и есть описание словаря - `DictionaryInfo`
