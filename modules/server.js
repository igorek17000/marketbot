//require('dotenv').config();

var nodemailer = require('nodemailer');
//'use strict';
// step 1
let transporter = nodemailer.createTransport({ 
host: 'smtp.gmail.com', 
port: 465, 
secure: true, 
auth: { 
type: 'OAuth2', 
user: 'alexdeabot@gmail.com', 
clientId: '33283131522-cq29rhd7rljomaj05rmj3akduug5ssag.apps.googleusercontent.com', 
clientSecret: 'q4c5EwEjj55y49uI3jiOTuFf'
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
