const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(3000, function() {
  console.log('App started on port 3000');
})
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/echo/:msg', (req, res) => {
  res.send(req.params.msg);
});