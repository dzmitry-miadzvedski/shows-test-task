# README #

node.js version 8.11 and mongodb should be installed

Database can be specified using DB_CONNECTION environment variable
Port can be specified using PORT environment variable

To install the dependencies, run:

```
$ npm install
```

To run tests use:

```
$ npm run test
```

To run scrapper use:

To scrap all shows pages

```
$ npm run build && npm run scrap
```

or

To scrap only first page

```
$ npm run build && npm run scrap-dev
```

To run application:

In development mode:

```
$ npm run start-dev
```

or

```
$npm run start-dev:watch
```

In production mode:

```
$ npm run build && npm run start
```
