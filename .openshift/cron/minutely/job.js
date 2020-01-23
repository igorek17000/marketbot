var cron = require("node-cron"); 
var express = require("express"); 


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({ 
host: 'mail.google.com', 
port: '465', 
secure: true, 
auth: { 
user: 'alexdeabot@gmail.com', 
pass: '113Hopest!' 
} 
}); 

cron.schedule("1 * * * *", function(){
var mailOptions = { 
from: 'alexdeabot@gmail.com', 
to: 'dstl_mike1@hotmail.com', 
subject: 'Cron Job', 
text: 'Trying out Cron' 
}; 

transporter.sendMail(mailOptions, function(error, info){ 
if(error) { 
res.send(400); 
} else { 
res.send(202); 
} 
}); 
});
});
