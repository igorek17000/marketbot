//require('dotenv').config();

var nodemailer = require('nodemailer');
//'use strict';
// step 1
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2'
    }
});

transporter.set('oauth2_provision_cb', (user, renew, callback) => {
    let accessToken = userTokens[user];
    if(!accessToken){
        return callback(new Error('Unknown user'));
    }else{
        return callback(null, accessToken);
    }
});

transporter.sendMail({
    from: 'alexdeabot@gmail.com',
    to: 'dstl_mike1@gmail.com',
    subject: 'Message',
    text: 'I hope this message gets through!',
    auth: {
        user: 'alexdeabot@gmail.com'
    }
});
