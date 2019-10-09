var nodemailer = require("nodemailer");
var { google } = require("googleapis");
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
     "812949370857-or76tf4ffh9c02nfrlkh9tvme6toi52h.apps.googleusercontent.com", // ClientID
     "x3OWhtvjYTAhw8g7a1fSx-Fe", // Client Secret
     "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
     refresh_token: "1//04zzcuuNDGFrICgYIARAAGAQSNwF-L9Ir2hNx_SAFbTdCx8-anbkRLuwm12TFLwJLkwBy48sfYwlv5QKhPm9IdfY4ef40s0aO9Ao"
});

var accessToken = oauth2Client.getAccessToken()

var smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
          type: "OAuth2",
          user: "alexdeabot@gmail.com",
          clientId: "812949370857-or76tf4ffh9c02nfrlkh9tvme6toi52h.apps.googleusercontent.com",
          clientSecret: "x3OWhtvjYTAhw8g7a1fSx-Fe",
          refreshToken: "1//04zzcuuNDGFrICgYIARAAGAQSNwF-L9Ir2hNx_SAFbTdCx8-anbkRLuwm12TFLwJLkwBy48sfYwlv5QKhPm9IdfY4ef40s0aO9Ao",
          accessToken: accessToken
     }
});

var mailOptions = {
     from: "alexdeabot@gmail.com",
     to: "dstl_mike1@hotmail.com",
     subject: "Node.js Email with Secure OAuth",
     generateTextFromHTML: true,
     html: "<b>Nodemailer with OAuth</b>"
};

smtpTransport.sendMail(mailOptions, function(error, response) {
if (error) {
console.log(error);
} else {
console.log(response);
}
Transport.close();
});
