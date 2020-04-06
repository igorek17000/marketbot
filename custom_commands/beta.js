mkdir cron-jobs-node 
cd cron-jobs-node 
npm init -y

npm install express node-cron fs

touch index.js



// index.js 

const cron = require("node-cron"); 
const express = require("express"); 
const fs = require("fs"); 
var nodemailer = require("nodemailer"); 


app = express(); 
[...]

[...] 
// schedule tasks to be run on the server 
cron.schedule("* * * * *", function() { 
console.log("running a task every minute"); 
}); 
app.listen(3128); 
[...]


//Bash
//node index.js running a task every minute 
//running a task every minute  



