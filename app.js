require('dotenv').config();

const express = require('express');
const app = express();

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(
  process.env.PORT,
  console.log('Server corriendo en', process.env.PORT)
);
