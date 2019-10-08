//require('dotenv').config();

var nodemailer = require('nodemailer');
//'use strict';
// step 1
let transporter = nodemailer.createTransport({ 
host: 'https://mail.google.com', 
port: 465, 
secure: true, 
auth: {
    //user: process.env.EMAIL,
    //pass: process.env.PASSWORD
user: 'alexdeabot@gmail.com',
pass: '113Hopest!'
  }
});

//step 2
let mailOptions = {
  from: 'alexdeabot@gmail.com',
  to: 'dstl_mike1@hotmail.com',
  subject: 'Testing and testing',
  text: 'It worked'
};

//step 3
transporter.sendMail(mailOptions, function(data, body) {
  if (err) {
    console.log('error occured: ', err);
  } else {
    console.log('email sent!! ');
  }
});
//test
