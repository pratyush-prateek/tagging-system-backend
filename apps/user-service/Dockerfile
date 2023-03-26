FROM node:alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --app=user-service

FROM node:alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
COPY --from=development /usr/src/app/dist ./apps/user-service/dist
CMD ["node", "./apps/user-service/dist/main"]
