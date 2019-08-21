<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Installation

You will need a google api key with geocoding api enabled 
```bash
$ npm install
$ cp config/security.ts.example config/security.ts
```
Fill you api in config/security.ts
Test the application
```bash
$ npm run test
```

## Running the app


```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{ "address": "48 avenue de Villiers, 75017 Paris"}' \
  localhost:3000/arrondissement

## Test

```bash
# unit tests
$ npm run test

```

