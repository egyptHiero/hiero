---
outline: deep
---

# Глава 8. Серверная часть

Заведем новое `nodejs` приложение с [fastify](https://fastify.dev/).

```shell
$ npx nx g @nx/node:application apps/api
NX  Generating @nx/node:application
✔ Which linter would you like to use? · eslint
✔ Which unit test runner would you like to use? · none
✔ Which end-to-end test runner would you like to use? · none
✔ Which framework do you want to use? · fastify

$ npx nx g vitest --project api
```

[Fastify](https://fastify.dev/) - отличный фреймворк для серверного приложения. Он современный, быстрый и расширяемый -
так как использует модульную архитектуру.

Сразу из коробки устаналивается плагин [`fastify-sensible`](https://github.com/fastify/fastify-sensible) — он добавляет
набор полезных утилит и стандартных обработчиков для удобства разработки API. Он включает часто используемые
HTTP-ответы, хелперы для ошибок, редиректов, кеширования и другие "sensible" (разумные/практичные) решения.

### Fastify-autoload

`Fastify` предоставляет возможность [автозагрузки](https://github.com/fastify/fastify-autoload) плагинов - нужно просто
разместить код инициализации плагина в папке `plugins`.

На данный момент, `vitest` не дружит с `fastify-autoload` и для работы тестов нужно прописать в настройки
`vite.config.ts`:

```
server: {
      deps: {
        inline: ["@fastify/autoload"],
      },
    },
```

Vitest использует Vite, который, по умолчанию, ориентирован на ESM, а
server.deps.inline — это своего рода "костыль" для совместимости Vitest с CommonJS-зависимостями и динамическими
импортами.

### Swagger

[Swagger](https://swagger.io/) это инструмент, который добавляет спецификацию [OpenAPI](https://www.openapis.org/),
описывая наш API в стандартизированном формате.

Подключим плагины:

- [@fastify/swagger](https://github.com/fastify/fastify-swagger) -
  для автоматической документации API, валидации и, в последующем, для проверки типов запроса клиентских вызовов.

- [@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui) -
  для просмотра спецификации в браузере.

```shell
npm i @fastify/swagger @fastify/swagger-ui
```

и добавим файл иницализации в папку `plugins`.

Теперь можно добавить схему в параметры роута:

```typescript
  fastify.get<{
  // тут описываем дженерик-типы параметров
}>(
  path,
  {
    shema: {
      // тут описываем схему
    }
  },
  handler);
```

Fastify использует синтаксис OpenAPI, для описания схем эндпоинтов, а это означает, что нужно описать в терминах
TypeBox все входные (path, querystring, body), и выходные параметры (response).
Один из способов избавиться от ручной работы и автоматически создавать TypeBox-схемы для DTO это использовать
библиотеку
[ts2typebox](https://github.com/xddq/ts2typebox)
из экосистемы
[typebox](https://github.com/sinclairzx81/typebox).
Она позволяет генерировать схемы на основе существующих TypeScript-типов.

```bash
$ npm install -D ts2typebox
```

Для роутов мы дублируем информацию в дженериках и в схеме. К счастью, в `fastify` есть плагин
[fastify-type-provider-typebox](https://github.com/fastify/fastify-type-provider-typebox),
который решает это проблему и типизирует параметры прямо из схемы.
