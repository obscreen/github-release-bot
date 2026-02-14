FROM node:18-alpine AS dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY .babelrc ./
COPY src ./src
COPY .env .env

CMD ["npm", "run", "dev"]


FROM dev AS build

RUN npm run build


FROM node:18-alpine AS prod

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY --from=build /app/build ./build

CMD ["node", "build"]
