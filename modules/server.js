var nodemailer = require("nodemailer"); 
var smtpTransport = nodemailer.createTransport("SMTP", { 
service: "Gmail", 
auth: { 
XOAuth2: { 
user: "your_email_address@gmail.com", 
// Your gmail address. 
// Not @developer.gserviceaccount.com 
clientId: "your_client_id", 
clientSecret: "your_client_secret", 
refreshToken: "your_refresh_token" 
} 
} 
}); 

var mailOptions = { 
from: "your_email_address@gmail.com", 
to: "my_another_email_address@gmail.com", 
subject: "Hello", 
generateTextFromHTML: true, 
html: "<b>Hello world</b>" 
}; 

smtpTransport.sendMail(mailOptions, function(error, response) { 
if (error) { 
console.log(error); 
} else { 
console.log(response); 
} 
smtpTransport.close(); 
});
