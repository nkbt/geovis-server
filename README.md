# geovis-mock [![npm](https://img.shields.io/npm/v/geovis-mock.svg?style=flat-square)](https://www.npmjs.com/package/geovis-mock)
            
[![Discord](https://img.shields.io/badge/chat-discord-blue.svg?style=flat-square)](https://discord.gg/013tGW1IMcW6Vd1o7)

[![CircleCI](https://img.shields.io/circleci/project/nkbt/geovis-mock.svg?style=flat-square)](https://circleci.com/gh/nkbt/geovis-mock)
[![Coverage](https://img.shields.io/coveralls/nkbt/geovis-mock.svg?style=flat-square)](https://codecov.io/github/nkbt/geovis-mock?branch=master)
[![Dependencies](https://img.shields.io/david/nkbt/geovis-mock.svg?style=flat-square)](https://david-dm.org/nkbt/geovis-mock)
[![Dev Dependencies](https://img.shields.io/david/dev/nkbt/geovis-mock.svg?style=flat-square)](https://david-dm.org/nkbt/geovis-mock#info=devDependencies)


Mock server to feed GeoVis with data


## Installation

```sh
npm install --global geovis-mock
```


## Usage


### Running server

```js
const {run} = require('@nkbt/geovis-mock');

const {
  WS_HOST = '0.0.0.0',
  WS_PORT = 10000
} = process.env;

run({WS_HOST, WS_PORT});
```


### Supported actions

1. PING

```js
request = {
  "action": "PING"
}

// Response includes original request message
response = {
  "req": {
    "action": "PING"
  },
  "res": {
    "time": 1473282575430
  }
};
```

2. GEO

```js
request = {
  "action": "GEO_START"
}

response = {
  "req": {
    "action": "GEO_START"
  },
  "res": [{
    "srcLat": 55.751244,
    "srcLon": 37.618423,
    "dstLat": 49.246292,
    "dstLon": -123.116226,
    "value": 2
  }]
};

response = {
  "req": {
    "action": "GEO_START"
  },
  "res": [{
    "srcLat": -33.865143,
    "srcLon": 151.2099,
    "dstLat": -12.462827,
    "dstLon": 130.841782,
    "value": 7
  }]
};
// and more responses until GEO_STOP is sent
request = {
  "action": "GEO_STOP"
}
// no responses anymore
```

### Logging

```sh
07:09 $ ./bin.js 
running server on ws://0.0.0.0:10000
Client connected
<< {"action": "PING"}
  >> {"req":{"action":"PING"},"res":{"time":1473282575430}}
<< {"action": "GEO_START"}
  >> {"req":{"action":"GEO_START"},"res":[{"srcLat":50.411198,"srcLon":30.446634,"dstLat":55.751244,"dstLon":37.618423,"value":3}]}
  >> {"req":{"action":"GEO_START"},"res":[{"srcLat":55.751244,"srcLon":37.618423,"dstLat":49.246292,"dstLon":-123.116226,"value":2}]}
  >> {"req":{"action":"GEO_START"},"res":[{"srcLat":50.411198,"srcLon":30.446634,"dstLat":55.751244,"dstLon":37.618423,"value":7}]}
<< {"action": "GEO_STOP"}
^C
```


## Development and testing

Currently is being developed and tested with the latest stable `Node 6` under `OSX`.

```bash
git clone git@github.com:nkbt/geovis-mock.git
cd geovis-mock
npm install
```


## Tests

```bash
# to run tests
npm test

# to generate test coverage (./coverage)
npm run cov
```


## License

MIT
