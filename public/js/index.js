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
socket.on("newmessage",function(message){
    console.log("new message",message);
   var li = jQuery('<li></li>');
   li.text(`${message.from}:${message.text}`);
   jQuery('#messages').append(li);
});
socket.on("newlocationmessage",function(message){
  var li = jQuery('<li></li>');
  li.text(`${message.from}:`);
  var a  = jQuery(`<a target="_blank" href="${message.url}" ></a>`);
  a.text('find me');
  li.append(a);
  jQuery('#messages').append(li);

 });
socket.emit("createmessage",{from:"ankit",text:"hey buddy"},function(data){
  console.log("yup got it",data);
});

 $('#message-form').on('submit',function(e){
  //console.log("inside jquery");
  e.preventDefault();
  socket.emit("createmessage",{
    from:"user",
    text: jQuery('[name=message]').val()
  },function(){
  });
});

var locationB = jQuery('#send-location');

locationB.on('click',function(){
  if(!navigator.geolocation)
   {
      return alert("your broswer does not support the geolocation api");
   }
  navigator.geolocation.getCurrentPosition(function(position){
     socket.emit("createlocationmessage",{
       latitude:position.coords.latitude,
       longitude:position.coords.longitude
     });
  },function(){
    alert("unable to fetch location");
  });
});
