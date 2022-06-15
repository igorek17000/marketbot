//var mongoDB     = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var connection_string = 'mongodb://alexbot:308boonave@cluster0-shard-00-00-esmha.mongodb.net:27017,cluster0-shard-00-01-esmha.mongodb.net:27017,cluster0-shard-00-02-esmha.mongodb.net:27017/marketbotai?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
var commands;

var getIpData = require('../modules/ipdata.js');
var moment = require('moment');
var axios = require('axios');
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');
var db_table = year;
var db_table2 = year + "-" + month;
var db_table3 = year + "-" + "returning";
var dbt = mongoose.connection;
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });


//exports.getAllDocuments
var getAllDocuments = async function(reqUrl) {
  var ipdata = await getIpData(ip);
  var is_ip = ipdata.ip;
  var ipp = ip.split(/, /)[0];
  var date = moment().utcOffset(-240).format('LL');
  var time = moment().utcOffset(-240).format('LTS');
  var year = moment().utcOffset(-240).format('YYYY');
  var month = moment().utcOffset(-240).format('MM');
  var day = moment().utcOffset(-240).format('DD');
  var matchHash = { ip: ip, reqUrl: reqUrl, date: date, time: time, info: ipdata};
  var repeat = { date, ip, time, reqUrl};
  var info = ipdata;
  reqUrl = reqUrl;
date = date;
var ip = ip; //is_ip; //ip.split(/, /)[0]; //is_ip;
dbt.collection(db_table).find({ip}).toArray(function(err, docs) {

if (err) {
return console.log(err);
}
if (docs < 1) {
  dbt.collection(db_table).insertOne(matchHash, (err, result) => {
  if (err) {
  return console.log(err);
}
  });
} else if(docs) {
dbt.collection(db_table2).find({ip}).toArray(function(err, docs) {
  if (err) {
  return console.log(err);
}
  if (docs < 1) {
    dbt.collection(db_table2).insertOne(matchHash, (err, result) => {
    if (err) {
    return console.log(err);
  }
});
  } else if(docs) {
  dbt.collection(db_table3).find({ip}).toArray(function(err, docs) {
    if (err) {
    return console.log(err);
}
    if (docs < 1) {
      dbt.collection(db_table3).insertOne(matchHash, (err, result) => {
      if (err) {
      return console.log(err);
    }
  });
} else if(docs) {
  dbt.collection(db_table3).updateOne( {"ip": ip}, {$push: {repeat}}, (err, result) => {
  if (err) {
  return console.log(err);
  }
});
}
});
}
});
}

});
}

/*
exports.addDoc = function(collection, matchHash, callback) {
dbt.collection(collection).insertOne(matchHash, (err, result) => {
if (err) {
return console.log(err);
}
if (callback)
msg = true;
callback(true, msg);
return msg;
});
});

exports.updateDoc = function(collection, matchHash, updateHash, callback) {
dbt.collection(collection).updateOne(matchHash, updateHash, (err, result) => {
if (err) {
return console.log(err);
}
if (callback)
msg = true;
callback(true, msg);
return msg;
});
});
*/

module.exports = getAllDocuments;
