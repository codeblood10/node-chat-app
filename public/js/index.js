var socket = io();
socket.on("connect",function(){
 console.log("connected to server");
 // socket.emit("createmessage",{
 //  to:'ak@gmail.com',
 //  text:'heey this is 47 ak 47'
 // });
});
socket.on("disconnect",function(){
  console.log("disconnected from server");
});
socket.on("newmessage",function(email){
    console.log("new email event",email);
});
