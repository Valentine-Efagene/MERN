require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');
const auth = require('./auth.js');

const app = express();

app.use('/auth', auth.routes);
installHandler(app);

const port = process.env.API_SERVER_PORT || 3000;

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();

app.get('/hello', (req, res) => {
  res.send('Hello World!'); // http://localhost:3000/hello
});

app.get('/echo/:msg', (req, res) => {
  res.send(req.params.msg); // http://localhost:3000/echo/love
});
