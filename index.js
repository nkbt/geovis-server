'use strict';


const ws = require('./ws');
const ping = require('./res/ping');
const geo = require('./res/geo');


const {
  WS_HOST = '0.0.0.0',
  WS_PORT = 10000
} = process.env;


module.exports = () => ws({
  WS_HOST,
  WS_PORT,
  res: Object.assign(
    {},
    ping,
    geo
  )
});
