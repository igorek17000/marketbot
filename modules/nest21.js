
function nest21Cmd(dataHash, callback) {
  var regex = /^\/nest21$/;

  if (regex.test(dataHash.request.text)) {
var nodemailer = require('nodemailer');
var Transport = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'alexdeabot@gmail.com',
pass: '113Hopest!'
);

var mailOptions = {
to: 'trigger@applet.ifttt.com',
from: 'alexdeabot@gmail.com',
subject: '#nest21',
generateTextFromHTML: true,
html: '<b>Nest thermostat set to 21 degrees celsius</b>'
};

Transport.sendMail(mailOptions, function(error, response) {
//transporter.sendMail(mailOptions, function(error, info){ 
//if(error) { 
//res.send(400); 
//} else { 
//res.send(202); 
//} 
//});

if (error) {
console.log(error);
} else {
console.log(response);
}
//Transport.close();
});
}
}
