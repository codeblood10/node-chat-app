const path = require("path");
const express = require("express");
const publicpath = path.join(__dirname,"../public"); // if path comes two zero length string then it return . server/../ is zero length

const app  = new express();
const port = process.env.PORT || 3000;
app.use(express.static(publicpath));


app.listen(port,()=>{
 console.log(`app is up and running at port ${port}`);
});
