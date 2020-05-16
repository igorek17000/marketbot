
var gmCommands = [gmCmd];




exports.modName = "GM Commands";


exports.checkCommands = function(dataHash, callback) {
  for (command in gmCommands) {
    var test = gmCommands[command](dataHash, callback);
    if (test)
      return test;
  }

  return false;
}



function gmCmd(dataHash, callback) {
  var regex = /^\/gm$/;

var moment = require('moment');
var date = moment().utcOffset(-300).format('LLLL');


var request = require('request');
var apiKey = '3ff9b16eb3019ed16c69ce87658e04d3';
var city = 'toronto';
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  if (regex.test(dataHash.request.text)) {


      //callback(true, "Test it out", []);
  request(url, function (err, response, body) {
if(err){
console.log('error:', error);

} else {


var weather = JSON.parse(body);

var oneof = "";
oneof += body;



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



var msg = weather.name + " weather at " + date + "\n" + "Currently: " + weather.main.temp + "° celsius" + "\n" + "Mainly: " + weather.weather[0].description + "\n" + "High: " + weather.main.temp_max +  "° celcius" + "\n" + "Low: " + weather.main.temp_min + "° celsius" + "\n" + "Relative humidity: " + weather.main.humidity + "\n" + "Wind: " + weather.wind.speed + " km/h" + "\n" + "Gusts: " + weather.wind.gust + "\n" + "Wind direction: Blowing from the " + direction + " bearing " + weather.wind.deg + "° degrees."; 
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


