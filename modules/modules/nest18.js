
var nodemailer = require('nodemailer');

var Transport = nodemailer.createTransport({

service: 'gmail',
auth: {
user: 'alexdeabot@gmail.com',
pass: '113Hopest'
}
});

function nest18() {
var mailOptions = {
to: 'trigger@applet.ifttt.com',
from: 'alexdeabot@gmail.com',
subject: '#nest18',
generateTextFromHTML: true,
html: '<b></b>'
};

Transport.sendMail(mailOptions, function(error, response) {

if (error) {
console.log(error);
} else {
console.log(response);
}
Transport.close();
});
return;
}


exports.nest18 = nest18();
