/*var request = require('request'); 
var apiKey = '3ff9b16eb3019ed16c69ce87658e04d3';
var city = 'toronto';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}` 
request(url, function (err, response, body) { 
if(err){ 
console.log('error:', error); 
} else { 
var weather = JSON.parse(body) 
var message = `It's ${weather.main.temp} degrees in ${weather.name}!`; 
var msg = "It's ${weather.main.temp} degrees in ${weather.name}!"; 


console.log(message); 
callback(msg);
}});
*/


var geolocation = require('geolocation');

/*
var request = require('request'); 
var options = { 
method: 'GET', 
url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/', 
headers: { 
'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com', 
'x-rapidapi-key': 'b0eb0323cdmsh4acdf0a8b6ee640p12bbf5jsn5cc6fcc144b3' 
} 
}; 
request(options, function (error, response, body) { 	
if (error) throw new Error(error); 	
console.log(body); 
});
*/

var request = require('request'); 
var options = { 
method: 'GET', 
url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/', 
qs: {ip: '2605%3A8d80%3A605%3Aa002%3A91a7%3A836d%3A52a5%3A5564'}, 
headers: { 
'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com', 
'x-rapidapi-key': 'b0eb0323cdmsh4acdf0a8b6ee640p12bbf5jsn5cc6fcc144b3' 
} 
}; 
request(options, function (error, response, body) { 	
if (error) throw new Error(error); 	
console.log(body); 
});




/*geolocation.getCurrentPosition(function (err, position) { 
if (err) throw err 
console.log(position);
});
*/
