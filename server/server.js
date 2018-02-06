const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const publicpath = path.join(__dirname,"../public"); // if path comes two zero length string then it return . server/../ is zero length

const app  = new express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
app.use(express.static(publicpath));
var io = socketIO(server);
io.on("connection",(socket)=>{
 console.log("new user is connected");
 socket.on("disconnect",()=>{
   console.log("disconnected from server");
 });
});

server.listen(port,()=>{
 console.log(`app is up and running at port ${port}`);
});
