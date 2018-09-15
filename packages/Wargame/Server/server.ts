const express = require('express');
const io = require('socket.io')();
const app = express();

io.listen(8000);

app.get('/', (req: any, res: any) => {
  res.send('Hello world!');
});

io.on('connection', (socket: any) => {
  console.log('a user connected');
});

app.listen(8000);

console.log('Server Listening on port 8000');
