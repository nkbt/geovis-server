'use strict';


const start = (send, ws) => Object.assign(req => {
  const sendGeo = () => {
    send(null, {
      req,
      res: {time: Date.now()}
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

