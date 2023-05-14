FROM node:alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --app=tagger-retrieval-service

FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
COPY --from=development /app/dist .
CMD ["node", "./apps/tagger-retrieval-service/dist/main"]
