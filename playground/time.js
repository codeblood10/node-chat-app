// jan 1st 1970 00:00:00 // ref date
var moment = require("moment");

var date = moment();
console.log(date.format("MMM Do, YYYY"));

console.log(date.format("h:mm A"));
console.log(moment("1035","h:mm A").format("h:mm A"));
