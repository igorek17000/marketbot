var nodemailer = require('nodemailer');

var Transport = nodemailer.createTransport({

service: 'gmail',
auth: {
user: 'alexdeabot@gmail.com',
pass: '113Hopest'
}
});


var mailOptions_1 = {
to: 'trigger@applet.ifttt.com',
from: 'alexdeabot@gmail.com',
subject: '#nest18',
generateTextFromHTML: true,
html: '<b></b>'
};


var now = Transport.sendMail(mailOptions_1, function(error, response) {

if (error) {
console.log(error);

} else {
console.log(response);

}
Transport.close();
});



