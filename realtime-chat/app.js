const express = require("express");
const app = require('express')();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.resolve(__dirname, 'views')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Web server listening at", addr.address + ":" + addr.port);
});