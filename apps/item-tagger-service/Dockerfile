FROM node:alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --app=item-tagger-service

FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./apps/item-tagger-service/dist
CMD ["node", "./apps/item-tagger-service/dist/main"]
