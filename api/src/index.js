const express = require('express');
const routes = require('./routes');
require('express-async-errors');

const app = express();
app.use(express.json());

app.use(routes);
app.use((error, request, response, next) => {
  console.log(error.message);
  response.sendStatus(500);
});

app.listen(3333, () => console.log('🔥 server started at http://localhost:3333 '));
