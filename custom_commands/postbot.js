
var cmds = [weatherCmd];

var HTTPS = require('https');

/*
 * Weather
 * For the full copyright and license information, please view the LICENSE.txt file.
 */

/* jslint node: true, sub: true */
'use strict';

var request = require('request'),
    qs      = require('querystring'),
    xml2JS  = require('xml2js');

// Init the module

  var xmlParser     = new xml2JS.Parser({charkey: 'C$', attrkey: 'A$', explicitArray: true}),
      defLang       = 'en-US',
      defDegreeType = 'F',
      defTimeout    = 10000,
      findUrl       = 'http://weather.service.msn.com/find.aspx';

  var find = function find(options, callback) {

    if(typeof callback !== 'function')
      callback = function callback(err, result) { return err || result; };

    if(!options || typeof options !== 'object')
      return callback('invalid options');

    if(!options.search)
      return callback('missing search input');

    var result     = [],
        lang       = options.lang || defLang,
        degreeType = options.degreeType || defDegreeType,
        timeout    = options.timeout || defTimeout,
        search     = qs.escape(''+options.search),
        reqUrl     = findUrl + '?src=outlook&weadegreetype=' + (''+degreeType) + '&culture=' + (''+lang) + '&weasearchstr=' + search;

    request.get({url: reqUrl, timeout: timeout}, function(err, res, body) {

      if(err)                    return callback(err);
      if(res.statusCode !== 200) return callback(new Error('request failed (' + res.statusCode + ')'));
      if(!body)                  return callback(new Error('failed to get body content'));

      // Check body content
      if(body.indexOf('<') !== 0) {
        if(body.search(/not found/i) !== -1) {
          return callback(null, result);
        }
        return callback(new Error('invalid body content'));
      }

      // Parse body
      xmlParser.parseString(body, function(err, resultJSON) {
        if(err) return callback(err);

        if(!resultJSON || !resultJSON.weatherdata || !resultJSON.weatherdata.weather)
          return callback(new Error('failed to parse weather data'));

        if(resultJSON.weatherdata.weather['A$'] && resultJSON.weatherdata.weather['A$'].errormessage)
          return callback(resultJSON.weatherdata.weather['A$'].errormessage);

        if(!(resultJSON.weatherdata.weather instanceof Array)) {
          return callback(new Error('missing weather info'));
        }

        // Iterate over weather data
        var weatherLen = resultJSON.weatherdata.weather.length,
            weatherItem;
        for(var i = 0; i < weatherLen; i++) {

          if(typeof resultJSON.weatherdata.weather[i]['A$'] !== 'object')
            continue;

          // Init weather item
          weatherItem = {
            location: {
              name: resultJSON.weatherdata.weather[i]['A$']['weatherlocationname'],
              zipcode: resultJSON.weatherdata.weather[i]['A$']['zipcode'],
              lat: resultJSON.weatherdata.weather[i]['A$']['lat'],
              long: resultJSON.weatherdata.weather[i]['A$']['long'],
              timezone: resultJSON.weatherdata.weather[i]['A$']['timezone'],
              alert: resultJSON.weatherdata.weather[i]['A$']['alert'],
              degreetype: resultJSON.weatherdata.weather[i]['A$']['degreetype'],
              imagerelativeurl: resultJSON.weatherdata.weather[i]['A$']['imagerelativeurl']
              //url: resultJSON.weatherdata.weather[i]['A$']['url'],
              //code: resultJSON.weatherdata.weather[i]['A$']['weatherlocationcode'],
              //entityid: resultJSON.weatherdata.weather[i]['A$']['entityid'],
              //encodedlocationname: resultJSON.weatherdata.weather[i]['A$']['encodedlocationname']
            },
            current: null,
            forecast: null
          };

          if(resultJSON.weatherdata.weather[i]['current'] instanceof Array && resultJSON.weatherdata.weather[i]['current'].length > 0) {
            if(typeof resultJSON.weatherdata.weather[i]['current'][0]['A$'] === 'object') {
              weatherItem.current = resultJSON.weatherdata.weather[i]['current'][0]['A$'];

              weatherItem.current.imageUrl = weatherItem.location.imagerelativeurl + 'law/' + weatherItem.current.skycode + '.gif';
            }
          }

          if(resultJSON.weatherdata.weather[i]['forecast'] instanceof Array) {
            weatherItem.forecast = [];
            for(var k = 0; k < resultJSON.weatherdata.weather[i]['forecast'].length; k++) {
              if(typeof resultJSON.weatherdata.weather[i]['forecast'][k]['A$'] === 'object')
                weatherItem.forecast.push(resultJSON.weatherdata.weather[i]['forecast'][k]['A$']);
            }
          }

          // Push weather item into result
          result.push(weatherItem);
        }

        return callback(null, result);
      });
    });
  };

  return {
    find: find
  };
}();




exports.modName = "Urban Dictionary";

exports.checkCommands = function(dataHash, callback) {
  cmds.some(function(cmd){
    return cmd(dataHash.funMode, dataHash.request.text, callback);
  });
}

exports.getCmdListDescription = function () {
  var cmdArr = [
    {cmd: "/urban 'string'", desc: "Responds with the first dictionary found on Urban Dictionary.", fun: true}
  ];

  return cmdArr;
}
/*
function cmdUrbanRnd(funMode, request, callback){
  var regex = /^\/urban/i;
  
  if (regex.test(request)){
    if(!funMode){
      callback(true, "Sorry I'm no fun right now.", []);
      return "Sorry I'm no fun right now.";
    }

    var options = {
      hostname: "api.urbandictionary.com",
      path: "/v0/random",
      rejectUnauthorized: false
    };

    var callbackAPI = function(response) {
      var str = [];

      response.on('data', function(chunk) {
        str += chunk;
      });

      response.on('end', function() {
        str = JSON.parse(str);
        
        var msg = '';
        if (typeof(str.list[0].definition) !== 'undefined'){
          msg = str.list[0].word + " - " + str.list[0].definition;
        } else {
          msg = "That's not even found in a fake internet dictionary.";
        }

        callback(true, msg, []);
      });
    };
    
    HTTPS.request(options, callbackAPI).end();
  } else {
    return false;
  }
}
*/


function weatherCmd(find, request, callback){
  var regex = /^\/urban (.+)/i;
  if (regex.test(request)){
  

    var val = regex.exec(request);

   
        var msg = [];
        msg = result;
        

        callback(true, msg, []);
    
    find({search: 'Toronto, ON', degreeType: 'C'}, function(err, result) {   if(err) console.log(err);     console.log(JSON.stringify(result, null, 2));return result; });

    
  } else {
    return false;
  }

}




