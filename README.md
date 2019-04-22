# Order Service

## Introduction

### How to run

#### Using docker

```sh
# provide environment variables via .env
cp .env.example .env

# build and start a server via docker-compose
docker-compose build
docker-compose up -d
```

## Configurations and Environment Variables

This project use [node-convict] to help managing configurations and environment variables. Configuration is merged following an order as following (see [node-convict-precendence-order]):

>

    1. Default value
    2. File (config.loadFile())
    3. Environment variables (only used when env property is set in schema; can be overridden using the env option of the convict function)
    4. Command line arguments (only used when arg property is set in schema; can be overridden using the args option of the convict function)
    5. Set and load calls (config.set() and config.load())

[node-convict]: https://github.com/mozilla/node-convict
[node-convict-precendence-order]: https://github.com/mozilla/node-convict#precendence-order
