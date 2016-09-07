#! /usr/bin/env node


'use strict';


const {
  WS_HOST = '0.0.0.0',
  WS_PORT = 10000
} = process.env;


const {run} = require('.');


run({WS_HOST, WS_PORT});
