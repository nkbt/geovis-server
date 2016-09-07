'use strict';


const ws = require('./ws');
const ping = require('./res/ping');
const geo = require('./res/geo');


exports.run = ({WS_HOST, WS_PORT}) => ws({
  WS_HOST,
  WS_PORT,
  res: Object.assign(
    {},
    ping,
    geo
  )
});

exports.ws = ws;
