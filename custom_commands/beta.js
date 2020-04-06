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



// create mail transporter 
let transporter = nodemailer.createTransport({ 
service: "gmail", 
auth: { 
user: "COMPANYEMAIL@gmail.com", 
pass: "userpass" 
} 
}); 
// sending emails at periodic intervals 
cron.schedule("* * * * Wednesday", function(){ 
console.log("---------------------"); 
console.log("Running Cron Job"); 

let mailOptions = { 
from: "COMPANYEMAIL@gmail.com", 
to: "sampleuser@gmail.com", 
subject: `Not a GDPR update ;)`, 
text: `Hi there, this email was automatically sent by us` 
}; 

transporter.sendMail(mailOptions, function(error, info) { 
if (error) { 
throw error; 
} else { 
console.log("Email successfully sent!"); 
} 
}); 
}); 

app.listen("3128");
