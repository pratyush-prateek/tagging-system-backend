FROM node:alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --app=item-tag-db-update-consumer

FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./apps/item-tag-db-update-consumer/dist
CMD ["node", "./apps/item-tag-db-update-consumer/dist/main"]