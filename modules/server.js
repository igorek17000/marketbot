require('dotenv').config();

var nodemailer = require('nodemailer');

// step 1

let transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

//step 2
let mailOptions = {
  from: 'dstl_mike1@hotmail.com.com',
  to: 'alexdeabot@gmail.com',
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
