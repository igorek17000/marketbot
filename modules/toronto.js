var weather = require('weather-js');

/*weather.find({search: 'Toronto, ON', degreeType: 'C'}, function(err, result) { 
if(err) console.log(err); 
console.log(JSON.stringify(result, null, 2)); //callback(result);//});



weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) { if(err) console.log(err); console.log(JSON.stringify(result, null, 2)); });
*/


exports.toronto = function(result, callback) { 
weather.find({search: 'Toronto, ON', degreeType: 'C'}, function(err, result) { 
if(err) throw err; 
var callback = callback;
callback(result);
});
}

/*mongoDB.connect(connection_string, function(err, db) { 
if(err) throw err; 
var allDocs = db.collection(collection).find().toArray(function(err, docs) { 
callback(docs); //db.close(); 
}); 
});
}
*/
