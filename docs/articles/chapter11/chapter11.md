#  Глава 11. Плагины

`Nx` предлагает гибкие возможности для настройки процессов сборки, разработки и деплоя через конфигурационные файлы.
Если стандартных возможностей недостаточно, то можно расширить функционал с помощью плагинов.

Вот что мне хочется автоматизировать:

- Генерация OpenApi схемы из приложения `api`.
- Генерация тайпингов клиента из OpenApi схемы для приложения `web`.
- Сборку докеризованых проектов (`web` и `api`) перед запуском `docker compose`.

Добавим плагин `tools` в папку /plugins.

```bash
$ npx i -D @nx/plugin
$ npx nx g @nx/plugin:plugin plugins/tools
```

Для реализации желаемого мне вполне хватит возможностей конфигурационных файлов. Однако плагины Nx также позволяют
подключать еще и генераторы и исполнители (executors), что может быть полезно для более сложных сценариев.

Запуск target всегда происходит в контексте проекта. Так как мой `docker-compose` зависит от нескольких проектов
[api, web], буду вызывать его в контексе 'tools'.

```json5
{
  "docker-compose:build": {
    "executor": "nx:run-commands",
    "options": {
      "command": "docker compose build --no-cache",
      "cwd": "{workspaceRoot}"
    },
    "dependsOn": [
      "api:build",
      "web:build"
    ],
    "inputs": [
      "production",
      "^production"
    ],
    "cache": true
  },
  "docker-compose:up": {
    "executor": "nx:run-commands",
    "options": {
      "command": "docker compose up -d",
      "cwd": "{workspaceRoot}"
    }
  },
  "docker-compose:down": {
    "executor": "nx:run-commands",
    "options": {
      "command": "docker compose down",
      "cwd": "{workspaceRoot}"
    }
  }
}
```

Запускаем так -

```bash
$ npx nx run tools:docker-up
# или так -
$ npx nx docker-up tools
```

`generate-typebox` создает typebox-объекты из DTO. Если указать в `inputs` зависимости включить кеширование, то
target будет вызываться, только при изменениях в input.
Добавим в build зависимость - "dependsOn": ["generate-typebox"],

```json
{
  "generate-typebox": {
    "executor": "nx:run-commands",
    "options": {
      "command": "npx ts2typebox -i src/dto/types.ts -o src/generated/typebox.ts",
      "cwd": "apps/api",
      "inputs": [
        "{projectRoot}/src/dto/types.ts"
      ],
      "cache": true
    }
  }
}
```

`generate-schema` подключим к сборке проекта `web` - "dependsOn": ["api:generate-schema"]. Теперь схема будет
пересоздаваться при измении роутов или DTO. Осталось только создать тайпинги с помощью
[openapi-typescript](https://openapi-ts.dev/introduction) -

```json
{
  "generate-schema": {
    "executor": "@nx/js:node",
    "options": {
      "buildTarget": "api:build",
      "args": [
        "--generate-schema",
        "apps/api/src/generated/schema.json"
      ],
      "watch": false
    },
    "inputs": [
      "{projectRoot}/src/dto/**/*.ts",
      "{projectRoot}/src/routes/**/*.ts"
    ],
    "cache": true,
    "dependsOn": [
      "^build"
    ]
  },
  "generate-client-typings": {
    "executor": "nx:run-commands",
    "options": {
      "command": "npx openapi-typescript apps/api/src/generated/schema.json -o apps/web/src/@types/openapi-schema.d.ts",
      "inputs": [
        "apps/api/src/generated/schema.json"
      ]
    },
    "cache": true
  }
}
```
