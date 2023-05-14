FROM node:alpine As development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --app=api-gateway

FROM node:alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
COPY --from=development /app/dist .
CMD ["node", "./apps/api-gateway/dist/main"]