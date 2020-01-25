var cron = require('node-cron');

 

var task = cron.schedule('* * * * *', () =>  {

  



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

var mailOptions = { 
from: 'alexdeabot@gmail.com', 
to: 'dstl_mike1@hotmail.com', 
subject: 'subject', 
text: 'New Registration:' 
}; 

//task.start();

transporter.sendMail(mailOptions, function(error, info){ 
if(error) { 
res.send(400); 
} else { 
res.send(202); 
} 
}); 
});
console.log('stoped task');

}, {

  scheduled: false

});

 

task.start();
//
