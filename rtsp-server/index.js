const express = require('express');
const app = express();
require('dotenv').config();

const { proxy } = require('rtsp-relay')(app);

const handler = (ws, url) => {
  const proxyFunction = proxy({
    url: url,
    verbose: false,
    transport: 'tcp'
  })

  proxyFunction(ws);
};

app.ws('/api/stream', (ws, req) => {
  handler(ws, req.query.url);
});

app.get('/healthCheck', (req, res) => {
  res.status(200).send('Server is running and healthy');
});

const LOCAL_PORT = 2000;
const PORT = process.env.APP_PORT || LOCAL_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});