var express = require('express');
var axios = require('axios');
var app = express();
//var ipdata = getIpData(ip);

//getIpData(ip);
var getIpData = async (ipp) => {
  //ip = ip;
  var IpDataKey = 'ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8';
  try {
    var IpDataKey = 'ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8';
  var res = await axios.get('https://api.ipdata.co/' + ipp + '?api-key=' + IpDataKey);
}
catch (error) {
    console.error(error);
  }
//console.log(res.data);
return res.data;
};

module.exports = getIpData;
