var nodemailer = require('nodemailer'); 
var transport = nodemailer.createTransport("SMTP", { 
host: 'gmail', 
Oauth2: {


}); 

var send_email = function (email_content) { 
var mailOptions = { 
from: 'me@example.com', 
to: 'my_gmail_nickname@gmail.com', 
subject: 'Hello!', 
html: email_content.content 
}; 

transport.sendMail(mailOptions, function (error, info) { 
if (error) { 
console.log(error); 
} else { console.log('Message sent: ' + info.message); 
transport.close(); 
} 
}) 
};


