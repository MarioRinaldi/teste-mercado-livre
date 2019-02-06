const express = require('express');
const routes = require('./routes');
const { args } = require('./helpers');

const app = express();

const argumentos = args.parse();
const host = argumentos.host || 'http://localhost';
const port = argumentos.port || 3030;
const url = [host, port].join(':');

app.use(routes.items);

app.listen(port, () => {
  console.log('Server running at', url);
});
