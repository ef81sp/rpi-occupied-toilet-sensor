const gpio = require('rpi-gpio');
const PIN = 12;

let status = false;
let isReady = false;

const log = (...txt) => {
  console.log(new Date().toString(), txt);
};

gpio.on('change', (ch, value) => {
  log(ch, value);
  status = value;
});

gpio.setup(PIN, gpio.DIR_IN, gpio.EDGE_BOTH, () => {
  log('RaspberryPi GPIO is ready!');
  isReady = true;
});

// ==================

const express = require('express');
const app = express();

app.listen(3000, () => log('express is ready!'));

app.get('/status', (req, res) => {
  if (!isReady) return res.status(500).json({ message: 'not ready' });
  const response = { isOccupied: status };
  log(response);
  return res.json(response);
});
