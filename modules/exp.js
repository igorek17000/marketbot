// Helper module
var moment = require('moment-timezone'); 
var date = moment.tz('America/Toronto').format('LLLL');


exports.alexbotDate = function() {
return date;
}




