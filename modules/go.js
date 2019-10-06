var nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
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

transport.sendMail(message, function(callback, err, info) {
  if callback(true, "Sending email", []);
} else {
    if (err) {
    callback(true, err);
  } else {
    callback(true, info);
  }
});
