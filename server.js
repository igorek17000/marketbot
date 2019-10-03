require('dotenv').config();

var nodemailer = require('nodemailer');

// step 1

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
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
transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log('error occured: ', err);
  } else {
    console.log('email sent!!');
  }
});
