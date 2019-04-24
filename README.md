# Order Service

<!-- TOC -->

- [Order Service](#order-service)
  - [Introduction](#introduction)
    - [How to run](#how-to-run)
      - [Using docker](#using-docker)
        - [GOOGLE_MAP_API_KEY](#google_map_api_key)
  - [Configurations and Environment Variables](#configurations-and-environment-variables)
  - [Swagger](#swagger)
  - [Tests](#tests)

<!-- /TOC -->

## Introduction

### How to run

#### Using docker

`docker-compose.yml` and `start.sh` bash script at the root of the project, which should setup all relevant services/applications.

```sh
# provide environment variables via .env
cp .env.example .env

# build and start a server via docker-compose
docker-compose build
docker-compose up -d
```

##### GOOGLE_MAP_API_KEY

This is the only required environment variable for service to run. The value should be set in `.env`

## Configurations and Environment Variables

This project use [node-convict] to help managing configurations and environment variables. Configuration is merged following an order as following (see [node-convict-precendence-order]):

>

    1. Default value
    2. File (config.loadFile())
    3. Environment variables (only used when env property is set in schema; can be overridden using the env option of the convict function)
    4. Command line arguments (only used when arg property is set in schema; can be overridden using the args option of the convict function)
    5. Set and load calls (config.set() and config.load())

## Swagger

After starting up the servier, a swagger web will be accessable via `http://localhost:8080/documentation/static/index.html`

## Tests

run `yarn test`

Some tests use in-memory mongo instance for mocking out real db connection. By default, running tests will auto-download `latest` Mongod binary on `npm install` to `node_modules/.cache` for obtaining the required `mongod` binary and this may slow down your testing experience. However you may provide your `mongod` binary by passing `MONGOMS_SYSTEM_BINARY` environment variable when running test. For example:

`MONGOMS_SYSTEM_BINARY=/usr/local/bin/mongod yarn test`

see more on [mongodb-memory-server-options]

[node-convict]: https://github.com/mozilla/node-convict
[node-convict-precendence-order]: https://github.com/mozilla/node-convict#precendence-order
[mongodb-memory-server-options]: https://github.com/nodkz/mongodb-memory-server#options-which-can-be-set-via-environment-variables
