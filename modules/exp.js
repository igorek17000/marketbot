var moment = require('moment-timezone'); 
var date = moment.tz('America/Toronto').format('LLLL');
exports.date = function() {
return date;
}
