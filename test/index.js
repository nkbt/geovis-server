'use strict';


const test = require('tape');
const lib = require('..');


test('Test', t => {
  t.equal(lib, 'OK', 'should be ok');
  t.end();
});
