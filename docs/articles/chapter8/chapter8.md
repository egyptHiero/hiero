---
outline: deep
---

# Глава 8. Серверная часть

Создадим новое `nodejs` приложение и в визарде выберем фреймворк [fastify](https://fastify.dev/).

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

`Vitest` использует `Vite`, который, по умолчанию, ориентирован на `ESM`, а
server.deps.inline — это своего рода "костыль" для совместимости Vitest с CommonJS-зависимостями и динамическими
импортами.

Также и Autoload для роутов тоже не будет работать в `Vitest`, нужно сделать явную загрузку роутов.

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

При запуске сервера в `develop`-моде будет запущен также swagger-ui `http://localhost:3000/docs`.

### OpenAPI схемы
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

### Генерация схем

При разработке API, обычно, сначала создают OpenAPI схемы и из них генерят DTO.
Но мне кажется, что гораздо удобнее создавать сначала DTO, а уже из них создавать схемы.
В экосистеме [typebox](https://github.com/sinclairzx81/typebox?tab=readme-ov-file#ecosystem) есть
библиотека
[ts2typebox](https://github.com/xddq/ts2typebox).
Она позволяет генерировать схемы на основе существующих TypeScript-типов.

```bash
$ npm install -D ts2typebox
```

Осталось подключить генерацию схем в сборку. Можно добавить конфигурацию руками, а для тех, кому лень открывать
[документацию](https://nx.dev/reference/core-api/nx/executors/run-commands) у
`Nx` есть генератор команд:

```bash
$ nx generate @nx/workspace:run-commands \
  --name generate-schemas \
  --command "npx ts2typebox -i apps/api/src/dto/types.ts -o apps/api/src/typebox/index.ts" \
  --cwd apps/api \
  --project api
```

::: details Осталось добавить зависимость в конфигурацию билда

```json5
{
  "targets": {
    "build": {
      // ...
      "dependsOn": [
        "generate-schemas"
      ]
    }
  }
}
```

:::

### Дженерики

Для роутов мы дублируем информацию в дженериках и в схеме. К счастью, в сообществе `fastify` есть плагин
[fastify-type-provider-typebox](https://github.com/fastify/fastify-type-provider-typebox),
который решает это проблему и типизирует параметры прямо из схемы.

```bash
$ npm i @fastify/type-provider-typebox
```

Дженерики больше не нужны, если использовать в роутах тип FastifyTypeBox вместо FastifyInstance.

```typescript
export type FastifyTypeBox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;
```

