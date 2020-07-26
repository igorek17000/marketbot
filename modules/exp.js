// Helper module


exports.alexbotDate = function() {
var moment = require('moment-timezone'); 
var date = moment.tz('America/Toronto').format('LLLL');
return date;
}




