// Helper module
var moment = require('moment-timezone'); 
var date = moment.tz('America/Toronto').format('LLLL');

function dated() {
var moment = require('moment-timezone'); 
var date = moment.tz('America/Toronto').format('LLLL');
return date;
}
//exports.alexbotDate = date;
exports.dated = dated();




