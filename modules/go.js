var nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  service: 'gmail's,
  host: 'smtp.gmail.com',
  port: '465',
  auth: {
    user: 'alexdeabot@gmail.com',
    pass: '113Hopest!'
  }
});

var message = {
  from: 'alexdeabot@gmail.com',
  to: 'dstl_mike1@hotmail.com',
  subject: 'Sending HTML email!!',
  html: '<h1>Is this it</h1><p>HTML on the way <b>Wait for it</b>TADA</p>'
};

transport.sendMail(message, function(err, info) {
  if (message) {
  callback(true, "Sending email", []);
  } else {
    return err;
  }
});
