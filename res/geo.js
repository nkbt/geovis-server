'use strict';


const stop = ({send: _send, ws, wss}) => _req => {
  if (wss.geo) {
    wss.geo.splice(wss.geo.indexOf(ws), 1);
  }
};


const start = ({send, ws, wss}) => Object.assign(_req => {
  Object.assign(wss, {geo: wss.geo ? wss.geo.concat([send]) : [send]});
}, {
  close: () => {
    stop({send, ws, wss});
  }
});


const broadcast = ({wss}) => Object.assign(request => {
  if (!wss.geo) {
    return;
  }
  const req = Object.assign({}, request);
  const {payload: res} = request;
  delete req.payload;

  wss.geo.forEach(send => send(null, {req, res}));
});


exports.GEO_START = start;
exports.GEO_STOP = stop;
exports.GEO_BROADCAST = broadcast;

