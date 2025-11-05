---
outline: deep
---

# Глава 3. Создание проекта

Теперь, когда мы более-менее разобрались, как читать и печатать иероглифы, можно переходить к разработке.
Понадобится простое SPA web-приложение, серверная часть, еще разные скрипты для подготовки данных и база для
их хранения.

### Nx

Не знаю, как вы создаете пет-проекты - последнее время я делаю это так -

::: code-group

```bash  [Команда]
$ npx create-nx-workspace@latest hiero --preset=apps
```

```ansi [Визард]
NX Let's create a new workspace [https://nx.dev/getting-started/intro]
✔ Which CI provider would you like to use? · github
```

```ansi [Результат]
NX Creating your v21.2.1 workspace.
✔ Installing dependencies with npm
✔ Successfully created the workspace: hiero.
✔ Nx Cloud has been set up successfully
✔ CI workflow has been generated successfully
```

:::

Не стану скрывать, мне очень нравится фреймворк Nx - он гибок, удобен, способен выполнять массу черновой работы.
Nx является агностическим фреймворком (не привязан к конкретным языкам или библиотекам), позволяет генерировать код,
управлять зависимостями, автоматизировать процессы сборки и тестирования, а так же содержит множество готовых
бойлерплейтов. С его помощью можно создавать проекты любого типа — от простых приложений до сложных
монорепозиториев.

Заполнив визард, получаем готовый workspace hiero с настроенным `TypeScript`, `git`, `ESLint` и `prettier`.

::: tip
Кстати, большинство IDE добавляют `./bin` в $PATH и запускать `Nx`-команды из консоли IDE можно без `npx`.

```shell
$ npx nx graph
$ nx graph
```

:::

### ESLint

Хоть `Nx` и подключил ESLint и можно запустить его на всех приложениях и библиотеках проекта

```bash
$ nx run-many -t lint --fix
```

но в файле `eslint.config.mjs` прописаны только базовые настройки (а фактически, только
одно правило enforceBuildableLibDependency для проверки "собирательности" библиотек).

Кстати, приятно, что `Nx` создает конфигурацию в новом, более удобном
[flat format](https://eslint.org/blog/2022/08/new-config-system-part-2/). Добавим
`prettierPlugin` и правила - `prettierPlugin.configs.recommended.rules`.

::: tip
А вы знали, что в eslint есть очень удобный
[Config Inspector](https://eslint.org/blog/2024/04/eslint-config-inspector/)?
Он запускается в браузере и показывает итоговую конфигурацию, все плагины, правила и исключения, примененные к файлам.

```shell
$ npx eslint --inspect-config
```

:::
