//require('dotenv').config();

var nodemailer = require('nodemailer');
//'use strict';
// step 1

transporter.set('oauth2_provision_cb', (user, renew, callback)=>{ 
let accessToken = userTokens[user]; 
if(!accessToken){ return callback(new Error('Unknown user')); 
}else{ 
return callback(null, accessToken); 
} 
});

transporter.on('token', token => { 
console.log('A new access token was generated'); 
console.log('User: %s', token.user); 
console.log('Access Token: %s', token.accessToken); 
console.log('Expires: %s', new Date(token.expires)); 
});

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
    refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx', 
accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x', 
expires: 1484314697598 } });

}
});
