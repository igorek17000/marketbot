var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
secure: 'true',
port: '465',
user: 'alexdeabot@gmail.com',
pass: '113Hopest!'
}
});

const mailOptions = {
from: 'alexdeabot@gmail.com', // sender address
to: 'dstl_mike1@hotmail.com', // list of receivers
subject: 'HTML test', // Subject line
html: '<p>Testing HTML here</p>'// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
if(err)
console.log(err)
else
console.log(info);
});
