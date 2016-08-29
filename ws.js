'use strict';


const {Server} = require('ws');


const encode = obj => JSON.stringify(obj);
const decode = str => {
  let obj;
  try {
    obj = JSON.parse(str);
  } catch (e) {
    return e;
  }
  return obj;
};


const responder = ws => (err, payload) => {
  if (err) {
    console.log('  ER', err);
    return;
  }
  if (ws.readyState !== 1) {
    console.log('  ER', 'Socket closed');
    return;
  }
  const response = encode(payload);
  console.log('  >>', response.substr(0, 250));
  ws.send(response);
};


const createProcessors = (ws, res) => {
  const applied = {};
  Object.keys(res).forEach(key => {
    applied[key] = res[key](responder(ws), ws);
    if (typeof applied[key].close !== 'function') {
      applied[key].close = () => {};
    }
  });

  return applied;
};


const server = ({WS_HOST, WS_PORT, res}) => {
  const wss = new Server({host: WS_HOST, port: WS_PORT}, () =>
    console.log(`running server on ws://${WS_HOST}:${WS_PORT}`));

  wss.on('connection', () => console.log('Client connected'));
  wss.on('connection', ws => {
    const processors = createProcessors(ws, res);

    ws.on('message', raw => console.log('<<', raw.substr(0, 250)));
    ws.on('message', raw => {
      const req = decode(raw);
      if (req instanceof Error) {
        responder(ws)(req);
        return;
      }
      if (processors[req.action]) {
        processors[req.action](req);
      } else {
        // TODO: create ERROR response
        console.log('  ER', `Unknown action: ${req.action}`);
      }
    });

    ws.on('close', () => console.log('Client disconnected'));
    ws.on('close', () =>
      Object.keys(processors).forEach(key => processors[key].close()));
  });
};


module.exports = server;
