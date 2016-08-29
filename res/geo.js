'use strict';


const SYD = [-33.865143, 151.209900];
const DARWIN = [-12.462827, 130.841782];
const NY = [40.730610, -73.935242];
const LONDON = [51.509865, -0.118092];
const VANCOUVER = [49.246292, -123.116226];
const MOSCOW = [55.751244, 37.618423];
const KYIV = [50.411198, 30.446634];
const sampleAttacks = [
  [SYD, NY],
  [SYD, DARWIN],
  [KYIV, MOSCOW],
  [VANCOUVER, NY],
  [MOSCOW, VANCOUVER],
  [LONDON, NY]
];
const rnd = (min, max) => (
  max === undefined ?
    Math.round(Math.random() * min) :
    (min + Math.round(Math.random() * max))
);
const sample = arr => arr[rnd(arr.length - 1)];


const mkAttack = ([srcLat, srcLon], [dstLat, dstLon]) => ({
  srcLat, srcLon, dstLat, dstLon, value: rnd(1, 10)
});


const start = (send, ws) => Object.assign(req => {
  const sendGeo = () => {
    send(null, {
      req,
      res: [mkAttack(...sample(sampleAttacks))]
    });
  };

  Object.assign(ws, {interval: setInterval(sendGeo, 2000)});
  sendGeo();
}, {close: () => clearInterval(ws.interval)});


const stop = (send, ws) => _req => {
  clearInterval(ws.interval);
};


exports.GEO_START = start;
exports.GEO_STOP = stop;
