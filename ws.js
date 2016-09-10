'use strict';


const {Server} = require('ws');
const c = require('colors/safe');

c.setTheme({
  info: 'green',
  data: 'grey',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

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


const log = (...args) => console.log(c.data('GeoVis'), ...args);
const error = (...args) => log(c.error('[ERROR]'), ...args);
const warn = (...args) => log(c.warn('[INFO] '), ...args);
const info = (...args) => log(c.info('[INFO] '), ...args);
const debug = (...args) => log(c.debug('[DEBUG]'), ...args.map(c.data));


const responder = ws => (err, payload) => {
  if (err) {
    warn(err.message);
    return;
  }
  if (ws.readyState !== 1) {
    warn('socket closed');
    return;
  }
  const response = encode(payload);
  debug('  >>', response.substr(0, 250));
  ws.send(response);
};


const createProcessors = (ws, wss, res) => {
  const applied = {};
  Object.keys(res).forEach(key => {
    applied[key] = res[key]({send: responder(ws), ws, wss});
    if (typeof applied[key].close !== 'function') {
      applied[key].close = () => {};
    }
  });

  return applied;
};


const server = ({WS_HOST, WS_PORT, res}) => {
  let i = 0;
  const wss = new Server({host: WS_HOST, port: WS_PORT}, () =>
    info(`running server on ws://${WS_HOST}:${WS_PORT}`));

  wss.on('connection', () => info('connected'));
  wss.on('connection', ws => {
    Object.assign(ws, {id: i++});

    const processors = createProcessors(ws, wss, res);

    ws.on('message', raw => debug('<<', raw.substr(0, 250)));
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
        error(`Unknown action: ${req.action}`);
      }
    });

    ws.on('close', () => info('disconnected'));
    ws.on('close', () =>
      Object.keys(processors).forEach(key => processors[key].close()));
  });

  return wss;
};


module.exports = server;
