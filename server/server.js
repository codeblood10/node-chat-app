const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const publicpath = path.join(__dirname,"../public"); // if path comes two zero length string then it return . server/../ is zero length

const {generateMessage,generateLocationMessage} = require("./utils/message");
const app  = new express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
app.use(express.static(publicpath));
var io = socketIO(server);
io.on("connection",(socket)=>{  // on is used to listen to an event
 console.log("new user is connected");
 socket.emit("newmessage",generateMessage('Admin','welcome to the group buddy'));
 socket.broadcast.emit('newmessage',generateMessage('Admin','new user joined'));
 socket.on('createmessage',(message,callback)=>{
   console.log('create a message',message);
   //broadcasting a message
     //server is broadcasting a message to every one
    io.emit('newmessage',generateMessage(message.from,message.text));
    callback();//acknowledgement
    //broadcast is done by a particular socket
//  socket.broadcast.emit('newmessage',{
//     from:message.from,
//      text:message.text,
//      createdAt: new Date().getTime()
// });

});
socket.on('createlocationmessage',(coords)=>{
  io.emit('newlocationmessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
});

 // socket.emit('newmessage',{
 //  from:'bankit',
 //  text:'hey whatsup',
 //  createdAt:124
 // }); // used to create an event
 socket.on("disconnect",()=>{
   console.log("client has been disconnected");
 });
});

server.listen(port,()=>{
 console.log(`app is up and running at port ${port}`);
});
