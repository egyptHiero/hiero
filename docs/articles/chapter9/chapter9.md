---
outline: deep
---

# Глава 9. Клиентская часть

Добавим новое react-приложение -

```bash
$ npm i -D @nx/react
$ nx g @nx/react:app apps/web
NX  Generating @nx/react:application
✔ Which stylesheet format would you like to use? · @emotion/styled
✔ Would you like to add routing to this application? (y/N) · true
✔ Which bundler do you want to use to build the application? · vite
✔ Which linter would you like to use? · eslint
✔ What unit test runner should be used? · vitest
✔ Which E2E test runner would you like to use? · none
✔ Which port would you like to use for the dev server? · 4200
```

В качестве stylesheet format выбрал `@emotion/styled` - мне нравится `CSS-JS`.

### Клиент

npm i @tanstack/react-query

npm i openapi-fetch
npm i -D openapi-typescript typescript

### CSS
npm i styled-system
npm i -D @types/styled-system

### CoreUI
@coreui/icons @coreui/icons-react

### Бесконечны скроллинг
npm install react-intersection-observer

### Плагин

npm i -D @nx/plugin
npx nx g @nx/plugin:plugin plugins/tools
NX  Generating @nx/plugin:plugin
✔ Which linter would you like to use? · eslint
✔ Which unit test runner would you like to use? · none

npx nx g @nx/plugin:executor
