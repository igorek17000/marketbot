var nodemailer = require("nodemailer"); 
var smtpTransport = nodemailer.createTransport("SMTP", { 
service: "Gmail", 
auth: { 
XOAuth2: { 
user: "alexdeabot@gmail.com", 
// Your gmail address. 
// Not @developer.gserviceaccount.com 
clientId: "33283131522-cq29rhd7rljomaj05rmj3akduug5ssag.apps.googleusercontent.com", 
clientSecret: "q4c5EwEjj55y49uI3jiOTuFf", 
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
