var app = require('express')(); 
var http = require('http').Server(app); 
var io = require('socket.io')(http); 
var ip = require("ip"); 
 
var counter = 1; 
 
app.get('/', function(req, res){ 
  res.sendFile(__dirname + '/index.html'); 
}); 
 
io.on('connection', function(socket){ 
  users.push(socket); 
 
  socket.on('start', function(){ 
 
    var namelist = []; 
    for (var i = 0; i < users.length; i++){ 
      namelist[i] = users[i].n; 
    } 
    io.emit('users list', namelist); 
  }); 
 
  socket.on('chatting', function(msg){ 
    io.emit('message', msg); 
  }); 
 
  socket.on('typing', function(){ 
    var namelist = []; 
    for (var i = 0; i < users.length; i++){ 
      namelist[i] = users[i].n; 
    } 
    io.emit('typing signal', namelist) ;  
  }); 
 
  socket.on('not typing', function(){ 
    io.emit('not typing signal');  
  }); 
 
  socket.on('disconnect', function() { 
    io.emit('disconnect', "User " + users[users.indexOf(socket)].n + " disconnected."); 
   }); 
}); 
 
http.listen(3000, function(){ 
  console.log("listening on localhost:3000 and "+ip.address()+":3000"); 
}); 
