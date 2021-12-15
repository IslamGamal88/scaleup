FROM node:16.13-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY ./packages/server ./

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /app/packages/server

RUN yarn build

EXPOSE 8080

WORKDIR /app/packages/server

CMD ["node", "dist/main"]
