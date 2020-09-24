var mainHTML;
var fs = require('fs');
//var config = require('../config/config');


init();

function init() {
  getFileAll('commands/command.html', function(data) {
    mainHTML = data;
  });
}

//feels pointless, come up with a better way to do this
function getFileAll(path, callback) {
  fs.readFile(path, 'utf8', function(err, data){
    callback(data);
  });
}

exports.buildHTML = function () {
  
  
  //put this repetitive code in a function ... you're better than this
  

  var mainBuiltHTML = mainHTML;
//  mainBuiltHTML = mainBuiltHTML.replace('$$bot_name', 'Alex Bot');
  
  return mainBuiltHTML;
}
