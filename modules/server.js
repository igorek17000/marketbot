var nodemailer = require("nodemailer"); 
var smtpTransport = nodemailer.createTransport({ 
service: "Gmail", 
auth: { 
XOAuth2: { 
user: "alexdeabot@gmail.com", 
// Your gmail address. 
// Not @developer.gserviceaccount.com 
clientId: "33283131522-cq29rhd7rljomaj05rmj3akduug5ssag.apps.googleusercontent.com", 
clientSecret: "q4c5EwEjj55y49uI3jiOTuFf", 
refreshToken: "1/erwx2VawfafgCpfx6N674Nzdae4klHplI9qAV4ZI5HM" 
} 
} 
}); 

var mailOptions = { 
from: "alexdeabot@gmail.com", 
to: "dstl_mike1@hotmail.com", 
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
