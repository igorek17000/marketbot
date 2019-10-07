
function(req, res){ 
var transporter = nodemailer.createTransport({ 
host: 'mail.server.com', 
port: '465', 
secure: true, 
auth: { 
user: 'account@server.com', 
pass: 'password' 
} 
}); 

var mailOptions = { 
from: 'account@server.com', 
to: 'account@server.com', 
subject: 'subject', 
text: 'New Registration:' 
}; 

transporter.sendMail(mailOptions, function(error, info){ 
if(error) { 
res.send(400); 
} else { 
res.send(200); 
} 
}); 
});
