var request = require('request'); 
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
