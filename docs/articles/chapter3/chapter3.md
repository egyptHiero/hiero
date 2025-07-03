---
outline: deep
---
# Глава 3. Создание проекта.

Теперь, когда мы более-менее разобрались, как читать и печатать иероглифы, можно переходить к разработке.
Понадобиться простое SPA web-приложение, серверная часть, еще разные скрипты для подготовки данных и база для
их хранения.

Не знаю, как вы создаете пет-проекты, мне нравится делать это вот так:

::: code-group

```bash  [Команда]
$ npx create-nx-workspace@latest hiero --preset=react-monorepo
```

```ansi [Визард]
NX Let's create a new workspace [https://nx.dev/getting-started/intro]
✔ Application name · web
✔ Which bundler would you like to use? · vite
✔ Which unit test runner would you like to use? · vitest
✔ Test runner to use for end to end (E2E) tests · playwright
✔ Default stylesheet format · @emotion/styled
✔ Would you like to use ESLint? · Yes
✔ Would you like to use Prettier for code formatting? · Yes
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

Мне очень нравится фреймворк Nx - он гибок, удобен, способен выполнять массу черновой работы. Nx является
агностическим фреймворком (не привязан к конкретным языкам или библиотекам), позволяет генерировать код,
управлять зависимостями, автоматизировать процессы сборки и тестирования, а так же содержит множество готовых
бойлерплейтов. С его помощью можно создавать проекты любого типа — от простых приложений до сложных
монорепозиториев.

Заполнив визард, получаем готовый workspace hiero с настроенным TypeScript, git, ESLint и prettier. А так же,
приложение на React и e2e-тесты. (Если создать пустой фреймворк, то )
