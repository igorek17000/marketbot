var nodemailer = require('nodemailer');
var Transport = nodemailer.createTransport({

service: 'gmail',
auth: {
user: 'alexdeabot@gmail.com',
pass: '113Hopest!'
}
});

let nest21 = function() {
let mailOptions = {
to: 'trigger@applet.ifttt.com',
from: 'alexdeabot@gmail.com',
subject: '#nest21',
generateTextFromHTML: true,
html: '<b>Nest thermostat set to 21 degrees celsius</b>'
};

Transport.sendMail(mailOptions, function(error, response) {

if (error) {
console.log(error);
} else {
console.log(response);
}
Transport.close();
});
}
}

let nest20 = function() {
let mailOptions = {
to: 'trigger@applet.ifttt.com',
from: 'alexdeabot@gmail.com',
subject: '#nest20',
generateTextFromHTML: true,
html: '<b>Nest thermostat set to 20 degrees celsius</b>'
};

Transport.sendMail(mailOptions, function(error, response) {

if (error) {
console.log(error);
} else {
console.log(response);
}
Transport.close();
});
}
}

exports.nest20 = nest20;
exports.nest21 = nest21;
