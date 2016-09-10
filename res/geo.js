'use strict';


const stop = ({send: _send, ws, wss}) => _req => {
  if (wss.geo) {
    delete wss.geo[ws.id];
  }
};


const start = ({send, ws, wss}) => Object.assign(_req => {
  Object.assign(wss, {
    geo: wss.geo ? Object.assign(wss.geo, {[ws.id]: send}) : {[ws.id]: send}
  });
}, {
  close: () => {
    stop({send, ws, wss})();
  }
});


const broadcast = ({wss}) => Object.assign(request => {
  if (!wss.geo) {
    return;
  }
  const req = Object.assign({}, request);
  const {payload: res} = request;
  delete req.payload;

  Object.keys(wss.geo).forEach(id => wss.geo[id](null, {req, res}));
});


exports.GEO_START = start;
exports.GEO_STOP = stop;
exports.GEO_BROADCAST = broadcast;

