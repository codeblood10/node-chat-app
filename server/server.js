const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const publicpath = path.join(__dirname,"../public"); // if path comes two zero length string then it return . server/../ is zero length

const {generateMessage,generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation.js");
const {Users} = require('./utils/user');
const app  = new express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
app.use(express.static(publicpath));
var io = socketIO(server);
var users = new Users();
io.on("connection",(socket)=>{  // on is used to listen to an event
 console.log("new user is connected");

 socket.on('join',(params,callback)=>{
   if(!isRealString(params.name)|| !isRealString(params.room))
     {
        return callback("enter valid values");
     }
       socket.join(params.room); // to make a specific room or private room
       users.removeUser(socket.id);
       users.addUser(socket.id,params.name,params.room);
       io.to(params.room).emit("updateUserList",users.getUserlist(params.room));
       //socket.leave(params.room); // to leave the room
       // fuction changes for particular room
          //io.emit-> io.to("room name").emit
          //socket.broddcast.emit -. socket.broadcast.to("room name").emit();
          //socket.emit(); // dont need to change only sending to his room only
          socket.emit("newmessage",generateMessage('Admin','welcome to the group buddy'));
          socket.broadcast.to(`${params.room}`).emit('newmessage',generateMessage('Admin',`${params.name} has joined`));

        callback();

 });
 socket.on('createmessage',(message,callback)=>{
   //console.log('create a message',message);
   //broadcasting a message
     //server is broadcasting a message to every one
   var user = users.getUser(socket.id);
   if(user&&isRealString(message.text)){
    io.to(user.room).emit('newmessage',generateMessage(user.name,message.text));
    callback();//acknowledgement
  }
    //broadcast is done by a particular socket
//  socket.broadcast.emit('newmessage',{
//     from:message.from,
//      text:message.text,
//      createdAt: new Date().getTime()
// });

});
socket.on('createlocationmessage',(coords)=>{
  var user = users.getUser(socket.id);
  if(user){
  io.to(user.room).emit('newlocationmessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
}
});

 // socket.emit('newmessage',{
 //  from:'bankit',
 //  text:'hey whatsup',
 //  createdAt:124
 // }); // used to create an event
 socket.on("disconnect",()=>{
   console.log("client has been disconnected");
   var user = users.removeUser(socket.id);
   console.log(user);
   if(user)
   {
      io.to(user.room).emit("updateUserList",users.getUserlist(user.room));
      io.to(user.room).emit('newmessage',generateMessage('Admin',`${user.name} has left`));
   }
 });
});

server.listen(port,()=>{
 console.log(`app is up and running at port ${port}`);
});
