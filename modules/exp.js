// Helper module


function alexbotDate() {
var moment = require('moment-timezone'); 
var date = moment.tz('America/Toronto').format('LLLL');
date;
return date;
}



exports.alexbotDate = alexbotDate;
