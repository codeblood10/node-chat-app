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
    from:"user",
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
