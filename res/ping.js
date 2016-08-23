'use strict';


const ping = send => req => send(null, {
  req,
  res: {time: Date.now()}
});


exports.PING = ping;

