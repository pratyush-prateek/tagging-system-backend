## Description

Implementation of a resource tagging system. Respective services will be hosted in K8S clusters. (In progress)

## Installation

`npm ci`

This installs dependencies from `package-lock.json`. Prefer this instead of doing `npm install`

## Building
To build a service, run `npm run build --app=<service_name>`
To build a service in release mode, run `npm ci --omit=dev` followed by `npm run build --app=<service_name>`

## Running the app
To run a service, use `npm run start:dev --app=<service_name>`

## Client generation
For generating client files, make sure your code changes are done.
Post that, run `npm run generate-client --app=<service_name>`. Make sure the service has a configuration set for generating clients.

## Building service images
For building a service image, make sure you have docker installed. 
Build the service in release mode. Then use `docker build --progress=plain --no-cache -t <image> -f apps/<service_name>/Dockerfile .`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

