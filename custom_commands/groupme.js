function weatherCurrentCmd(dataHash, callback) {
  var regex = /^\/weather current$/;

var moment = require('moment');
var date = moment().utcOffset(-300).format('LLLL');
//var toronto = weather.find({search: 'Toronto, ON', degreeType: 'C'}); //, function(err, result) {
//if(err) console.log(err);
//console.log(JSON.stringify(result, null, 2));
//callback(result);
//});

var request = require('request');
var apiKey = '3ff9b16eb3019ed16c69ce87658e04d3';
var city = 'toronto';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
//var weather = JSON.parse(body);

//var direction;
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;



  if (regex.test(dataHash.request.text)) {


      //callback(true, "Test it out", []);
  request(url, function (err, response, body) {
if(err){
console.log('error:', error);

} else {


var weather = JSON.parse(body);
//<<<<<<< HEAD
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
//=======
var oneof = "";
oneof += body;
//var oneoff = JSON.parse(oneof);
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`; 
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa


//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;

var direction = "";
if (weather.wind.deg == 350 || weather.wind.deg == 360 || weather.wind.deg == 10) {
direction = "N";
} else if (weather.wind.deg == 20 || weather.wind.deg == 30) {
direction = "N/NE";
} else if (weather.wind.deg == 40 || weather.wind.deg == 50) {
direction = "NE";
} else if (weather.wind.deg == 60 || weather.wind.deg == 70) {
direction = "E/NE";
} else if (weather.wind.deg == 80 || weather.wind.deg == 90 || weather.wind.deg == 100) {
direction = "E";
} else if (weather.wind.deg == 110 || weather.wind.deg == 120) {
direction = "E/SE";
} else if (weather.wind.deg == 130 || weather.wind.deg == 140) {
direction = "SE";
} else if (weather.wind.deg == 150 || weather.wind.deg == 160) {
direction = "S/SE";
} else if (weather.wind.deg == 170 || weather.wind.deg == 180 || weather.wind.deg == 190) {
direction = "S";
} else if (weather.wind.deg == 200 || weather.wind.deg == 210) {
direction = "S/SW";
} else if (weather.wind.deg == 220 || weather.wind.deg == 230) {
direction = "SW";
} else if (weather.wind.deg == 240 || weather.wind.deg == 250) {
direction = "W/SW";
} else if (weather.wind.deg == 260 || weather.wind.deg == 270 || weather.wind.deg == 280) {
direction = "W";
} else if (weather.wind.deg == 290 || weather.wind.deg == 300) {
direction = "W/NW";
} else if (weather.wind.deg == 310 || weather.wind.deg == 320) {
direction = "NW";
} else if (weather.wind.deg == 330 || weather.wind.deg == 340) {
direction = "N/NW";
}
direction: direction;


//var message = `It's ${weather.main} degrees in ${weather.name}!`;



var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;


//<<<<<<< HEAD
var msg = weather.name + " weather at " + weather.dt_txt + "\n" + "Currently: " + weather.main.temp + "° celsius" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max +  "° celcius" + "\n" + "Low: " + weather.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + weather.wind.deg + "° degrees.";

//=======
var msg = weather.name + " weather at " + date + "\n" + "Currently: " + weather.main.temp + "° celsius" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max +  "° celcius" + "\n" + "Low: " + weather.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Gusts: " + weather.wind.gust + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + weather.wind.deg + "° degrees."; 
//var msg = oneof;
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa
console.log(message);


callback(true, msg, []);
return msg;

}
});
} else {
//return msg;




return false;
}
}


function weatherForecastCmd(dataHash, callback) {
  var regex = /^\/weather forecast$/;

var moment = require('moment');
var date = moment().utcOffset(-300).format('LLLL');
//var toronto = weather.find({search: 'Toronto, ON', degreeType: 'C'}); //, function(err, result) {
//if(err) console.log(err);
//console.log(JSON.stringify(result, null, 2));
//callback(result);
//});

var request = require('request');
var apiKey = '3ff9b16eb3019ed16c69ce87658e04d3';
var city = 'toronto';
//<<<<<<< HEAD
//var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
//=======
var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=2&appid=${apiKey}` 
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa
//var weather = JSON.parse(body);

//var direction;
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;



  if (regex.test(dataHash.request.text)) {


      //callback(true, "Test it out", []);
  request(url, function (err, response, body) {
if(err){
console.log('error:', error);

} else {

var forecast = JSON.parse(body);
//<<<<<<< HEAD
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

//=======
//var message = `It's ${weather.main.temp} degrees in ${weather.name}!`; 
var oneof = "";
oneof += body;
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa

//var msg = "Current weather in " + weather.name + "\n" + "Currently: " + weather.main.temp + " degrees C" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max + " C"+ "\n" + "Low: " + weather.main.temp_min + " C" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Wind direction: " + weather.wind.deg + direction;

/*var direction = "";
if (forecast.wind.deg == 350 || forecast.wind.deg == 360 || forecast.wind.deg == 10) {
direction = "N";
} else if (forecast.wind.deg == 20 || forecast.wind.deg == 30) {
direction = "N/NE";
} else if (forecast.wind.deg == 40 || forecast.wind.deg == 50) {
direction = "NE";
} else if (forecast.wind.deg == 60 || forecast.wind.deg == 70) {
direction = "E/NE";
} else if (forecast.wind.deg == 80 || forecast.wind.deg == 90 || forecast.wind.deg == 100) {
direction = "E";
} else if (forecast.wind.deg == 110 || forecast.wind.deg == 120) {
direction = "E/SE";
} else if (forecast.wind.deg == 130 || forecast.wind.deg == 140) {
direction = "SE";
} else if (forecast.wind.deg == 150 || forecast.wind.deg == 160) {
direction = "S/SE";
} else if (forecast.wind.deg == 170 || forecast.wind.deg == 180 || forecast.wind.deg == 190) {
direction = "S";
} else if (forecast.wind.deg == 200 || forecast.wind.deg == 210) {
direction = "S/SW";
} else if (forecast.wind.deg == 220 || forecast.wind.deg == 230) {
direction = "SW";
} else if (forecast.wind.deg == 240 || forecast.wind.deg == 250) {
direction = "W/SW";
} else if (forecast.wind.deg == 260 || forecast.wind.deg == 270 || forecast.wind.deg == 280) {
direction = "W";
} else if (forecast.wind.deg == 290 || forecast.wind.deg == 300) {
direction = "W/NW";
} else if (forecast.wind.deg == 310 || forecast.wind.deg == 320) {
direction = "NW";
} else if (forecast.wind.deg == 330 || forecast.wind.deg == 340) {
direction = "N/NW";
}
direction: direction;
*/

//var message = `It's ${forecast.main} degrees in ${forecast.name}!`;



//<<<<<<< HEAD
//var message = `It's ${forecast.main.temp} degrees in ${forecast.name}!`;


//var msg = "Current weather in " + forecast.name + "\n" + "Currently: " + forecast.main.temp + "° celsius" + "\n" + "Mainly: " + forecast.weather[0].description + "\n" + "High: " + forecast.main.temp_max +  "° celcius" + "\n" + "Low: " + forecast.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + forecast.main.humidity + "\n" + "Wind: " + forecast.wind.speed + " km/h" + "\n" + "Wind gusts: " + forecast.wind.gust + " km/h" + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + forecast.wind.deg + "° degrees.";
//=======
//var message = `It's ${forecast.main.temp} degrees in ${forecast.name}!`; 


var msg = oneof; //"Current weather in " + forecast.name + "\n" + "Currently: " + forecast.main.temp + "° celsius" + "\n" + "Mainly: " + forecast.weather[0].description + "\n" + "High: " + forecast.main.temp_max +  "° celcius" + "\n" + "Low: " + forecast.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + forecast.main.humidity + "\n" + "Wind: " + forecast.wind.speed + " km/h" + "\n" + "Wind gusts: " + forecast.wind.gust + " km/h" + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + forecast.wind.deg + "° degrees."; 
//>>>>>>> 91e2a81bc0ddb59b2639c538bc2136c8b39444aa

console.log(msg); //message);


callback(true, msg, []);
return msg;

}
});
} else {
//return msg;




return false;
}
}
