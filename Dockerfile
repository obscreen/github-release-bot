FROM node:18-alpine AS dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY src ./src
COPY .env .env

CMD ["npm", "run", "dev"]

FROM node:18-alpine AS prod

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY src ./src
COPY .env .env

CMD ["npm", "run", "start"]