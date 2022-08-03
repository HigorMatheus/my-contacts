const express = require('express');
const routes = require('./routes');
require('express-async-errors');

const app = express();
const cors = require('./app/middlewares/cors');
const errorHandle = require('./app/middlewares/errorHandle');

app.use(express.json());

app.use(cors);

app.use(routes);
app.use(errorHandle);

app.listen(3333, () => console.log('🔥 server started at http://localhost:3333 '));
