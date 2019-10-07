var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
secure: 'false',
port: '587',
user: 'alexdeabot@gmail.com',
pass: '113Hopest!'
}
});

const mailOptions = {
from: 'alexdeabot@gmail.com', // sender address
to: 'alexdeabot@gmail.com', // list of receivers
subject: 'HTML test', // Subject line
html: '<p>Testing HTML here</p>'// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
if(err)
console.log(err)
else
console.log(info);
});
