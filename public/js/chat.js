var socket = io();
//our query string reside in location object search property
//jQuery.params({name="ankit",age=21}) convert into query string but does not a function to do vice versa

socket.on("connect",function(){
 console.log("connected to server");
 var param = jQuery.deparam(window.location.search);
 socket.emit('join',param,function(err){
   if(err)
   {
     alert(err);
     window.location.href="/";
   }
   else
   {
     console.log("no error");
   }
 });
 // socket.emit("createmessage",{
 //  to:'ak@gmail.com',
 //  text:'hey this is 47 ak 47'
 // });
});

socket.on("disconnect",function(){
  console.log("disconnected from server");
});
socket.on('updateUserList',function(users){
  var ol = jQuery("<ol></ol>");
    jQuery("#users").empty();
  users.forEach(function(user){
    ol.append(jQuery("<li></li>").text(user));
  });
  jQuery("#users").append(ol); // we can use .html(ol) to wipe the list and update
});
function scrollToBottom(){
 //selectors
   var messages  = jQuery("#messages");
   var newmessage = messages.children("li:last-child");
 //heights
  var st =  messages.prop('scrollTop');
  var ch = messages.prop('clientHeight');
  var sh = messages.prop('scrollHeight');
  var nmh = newmessage.innerHeight();
  var lmh = newmessage.prev().innerHeight();
  if(st + ch  +nmh +lmh >= sh)
  {
    //console.log('should scroll');
    messages.scrollTop(sh);
  }
}
socket.on("newmessage",function(message){
    //console.log("new message",message);
    var formattedtime = moment(message.createdAt).format("hh:mm a");
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
      text : message.text,
      from : message.from,
      createdAt : formattedtime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
   //
   // var li = jQuery('<li></li>');
   // li.text(`${message.from} ${formattedtime}:${message.text}`);
   // jQuery('#messages').append(li);
});
socket.on("newlocationmessage",function(message){
  var formattedtime = moment(message.createdAt).format("hh:mm a");
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template,{
     from : message.from ,
     url  : message.url,
     createdAt : formattedtime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li = jQuery('<li></li>');

  // li.text(`${message.from} ${formattedtime}:`);
  // var a  = jQuery(`<a target="_blank" href="${message.url}" ></a>`);
  // a.text('find me');
  // li.append(a);
  // jQuery('#messages').append(li);
 });
// socket.emit("createmessage",{from:"ankit",text:"hey buddy"},function(data){
//   console.log("yup got it",data);
// });
 var messageTextBox = jQuery("[name=message]");
 $('#message-form').on('submit',function(e){
  //console.log("inside jquery");
  e.preventDefault();
  socket.emit("createmessage",{
    text: messageTextBox.val()
  },function(){
     messageTextBox.val('')
  });
});

var locationB = jQuery('#send-location');

locationB.on('click',function(){
  if(!navigator.geolocation)
   {
      return alert("your broswer does not support the geolocation api");
   }
   locationB.attr('disabled','disabled').text("sending location....");
  navigator.geolocation.getCurrentPosition(function(position){
    locationB.removeAttr('disabled').text("Send location");
     socket.emit("createlocationmessage",{
       latitude:position.coords.latitude,
       longitude:position.coords.longitude
     });
  },function(){
    locationB.removeAttr('disabled').text("Send location");
    alert("unable to fetch location");
  });
});
