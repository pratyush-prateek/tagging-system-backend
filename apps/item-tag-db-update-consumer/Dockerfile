FROM node:alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --app=item-tag-db-update-consumer

FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
COPY --from=development /app/dist .
CMD ["node", "./apps/item-tag-db-update-consumer/dist/main"]