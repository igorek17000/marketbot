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
//var http = require("https"); var options = { 	"method": "GET", 	"hostname": "ip-geolocation-ipwhois-io.p.rapidapi.com", 	"port": null, 	"path": "/json/?ip=72.143.201.34", 	"headers": { 		"x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com", 		"x-rapidapi-key": "b0eb0323cdmsh4acdf0a8b6ee640p12bbf5jsn5cc6fcc144b3" 	} }; var req = http.request(options, function (res) { 	var chunks = []; 	res.on("data", function (chunk) { 		chunks.push(chunk); 	}); 	res.on("end", function () { 		var body = Buffer.concat(chunks); 		console.log(body.toString()); 	}); }); req.end();



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


var request = require('request'); 
var options = { 
method: 'GET', 
url: 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/', 
qs: {ip: '72.143.201.34'}, 
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
var navigator;

geolocation.getCurrentPosition(function (err, position) { 
if (err) throw err 
console.log(position)
});

