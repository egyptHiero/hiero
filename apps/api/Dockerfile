FROM node:22-alpine
WORKDIR /app

COPY apps/api/dist/apps/api .

RUN npm ci

# for LevelDB
RUN mkdir -p /app/data/hiero-db
COPY data/hiero-db /app/data/hiero-db
RUN chown -R node:node /app/data

USER node
EXPOSE 3000
CMD ["node", "main.js"]
