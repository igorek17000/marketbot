var moment = require('moment-timezone'); 
var date = moment.tz('America/Toronto').format('LLLL');
export.date = function() {
return date;
}
