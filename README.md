## Description

Implementation of a resource tagging system. Respective services will be hosted in K8S clusters. (In progress)

## Installation

```bash
$ npm ci
```
This installs dependencies from `package-lock.json`. Prefer this instead of doing `npm install`

## Building
To build a service, run `npm run build --app=<service_name>`

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

