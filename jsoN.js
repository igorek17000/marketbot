var express = require('express');
var router = express.Router();
var jsoN = require('./modules/jsoN.js');

router.use((req, res, next) => {
var msg, logg;
   var ip = '24.114.79.251'; //request.headers['x-forwarded-for'] || request.connection.remoteAddress;
var ipp = ip.split(/, /)[0];
var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var year = moment().utcOffset(-240).format('YYYY');
var month = moment().utcOffset(-240).format('MM');
var day = moment().utcOffset(-240).format('DD');

   function json(ip) {
ip = ip;
 var msg, logg;

var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var ipp = ip.split(/, /)[0];
return fetch(ip).then(res => res.json());
}
//var logg; // = "data.ip + '\n'
let IpDataKey = 'ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8';
//let IpDataKey = '24.114.79.251';
json('https://api.ipdata.co/' + ipp + '?api-key=' + IpDataKey).then(data => {
//json('https://api.ipdata.co/' + ipp + '?api-key=ec4dc9ef04e95d5e4e462c6ee7188c73ddadfc3016fb1da35b1128d8').then(data => {
//console.log(date + ' ' + time + '\n' + data.city + ', ' + data.country_name + ' Postal: ' + data.postal + '\n' + data.asn.name + ' Domain: ' + data.asn.domain + '\n' + request.protocol + '://' + request.hostname + '\n' + request.url);
//console.log(data);
var msg, logg;

var date = moment().utcOffset(-240).format('LL');
var time = moment().utcOffset(-240).format('LTS');
var ipp = ip.split(/, /)[0];
//});
//if (process.env.NODE_ENV != 'development') {

  //is_anonymous: false, is_known_attacker: false, is_known_abuser: false, is_threat: false,

  // var data;
    if (data.threat.is_known_attacker == true) { //true) {
    // console.log(logg);
       logg = date + ' ' + time + '\n' + request.protocol + '://' + request.hostname + '\n' + request.url + '\n' + 'Location: {' + '\n' + 'City: ' + data.city + '\n' + 'Country: ' + data.country_name + '\n' + 'Postal: ' + data.postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + data.asn.name + '\n' + ' Domain: ' + data.asn.domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_known_attacker: ' + data.threat.is_known_attacker + '\n' + 'is_known_abuser: ' + data.threat.is_known_abuser + '\n' + 'is_threat: ' + data.threat.is_threat + '\n' + 'is_anonymous: ' + data.threat.is_anonymous + '\n' + '}';
     msg = "return " + response.status(400).send('Not Allowed'); //html);
   }
if (data.threat.is_known_abuser == true) {
    // console.log(logg);
   logg = date + ' ' + time + '\n' + request.protocol + '://' + request.hostname + '\n' + request.url + '\n' + 'Location: {' + '\n' + 'City: ' + data.city + ',\n' + 'Country: ' + data.country_name + '\n' + 'Postal: ' + data.postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + data.asn.name + '\n' + 'Domain: ' + data.asn.domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_known_attacker: ' + data.threat.is_known_attacker + '\n' + 'is_known_abuser: ' + data.threat.is_known_abuser + '\n' + 'is_threat: ' + data.threat.is_threat + '\n' + 'is_anonymous: ' + data.threat.is_anonymous + '\n' + '}';
     msg = "return " + response.status(400).send('Not Allowed'); //html);
        }
if (data.threat.is_threat == true) {
   //  console.log(logg);
   logg = date + ' ' + time + '\n' + request.protocol + '://' + request.hostname + '\n' + request.url + '\n' + 'Location: {' + '\n' + 'City: ' + data.city + ',\n' + 'Country: ' + data.country_name + '\n' + 'Postal: ' + data.postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + data.asn.name + '\n' + 'Domain: ' + data.asn.domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_known_attacker: ' + data.threat.is_known_attacker + '\n' + 'is_known_abuser: ' + data.threat.is_known_abuser + '\n' + 'is_threat: ' + data.threat.is_threat + '\n' + 'is_anonymous: ' + data.threat.is_anonymous + '\n' + '}';
     msg = "return " + response.status(400).send('Not Allowed'); //html);
        }
if (data.threat.is_anonymous == false) {
    logg = date + ' ' + time + '\n' + request.protocol + '://' + request.hostname + '\n' + request.url + '\n' + 'Location: {' + '\n' + 'City: ' + data.city + ',\n' + 'Country: ' + data.country_name + '\n' + 'Postal: ' + data.postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + data.asn.name + '\n' + 'Domain: ' + data.asn.domain + '\n' + '},' + '\n' + 'Threat: {' + '\n' + 'is_known_attacker: ' + data.threat.is_known_attacker + '\n' + 'is_known_abuser: ' + data.threat.is_known_abuser + '\n' + 'is_threat: ' + data.threat.is_threat + '\n' + 'is_anonymous: ' + data.threat.is_anonymous + '\n' + '}';

 //  console.log(logg);
    msg = "return " + response.status(400).send("VPN's are Not Allowed"); //html);

    } //else {
   if (data.threat.is_known_attacker == false && data.threat.is_known_abuser == false && data.threat.is_threat == false) { // && data.threat.is_anonymous == false) {
       logg = date + ' ' + time + '\n' + request.protocol + '://' + request.hostname + '\n' + request.url + '\n' + 'Location: {' + '\n' + 'City: ' + data.city + ',\n' + 'Country: ' + data.country_name + '\n' + 'Postal: ' + data.postal + '\n' + '},' + '\n' + 'Asn: {' + '\n' + 'Name: ' + data.asn.name + '\n' + 'Domain: ' + data.asn.domain + '\n' + '}';

     // next = "next()";
     msg = "break"; //"next()";
      // console.log(logg);


//msg = "return " + response(); //html);
}
 console.log(logg);
//msg = next();
});
msg;
   next();
//msg;
   });
//if (process.env.NODE_ENV != 'development') {
//if (!request.secure) { // || request.headers.host == 'elb.b9ad.pro-us-east-1.openshiftapps.com' || request.headers.host == 'ai-marketing.b9ad.pro-us-east-1.openshiftapps.com') { // || //request.headers.host == 'marketbot.ca') { // || request.headers.host == 'https://www.marketbot-ai.com' || request.headers.host == 'marketbot-ai.com' || !request.secure) {
//return response.status(301).redirect('https://marketbotai.com/home');
//}
   /*
  if (request.headers.host == 'elb.b9ad.pro-us-east-1.openshiftapps.com' || request.headers.host == 'ai-marketing.b9ad.pro-us-east-1.openshiftapps.com') { // || //request.headers.host == 'marketbot.ca') { // || request.headers.host == 'https://www.marketbot-ai.com' || request.headers.host == 'marketbot-ai.com' || !request.secure) {
return response.status(301).redirect('https://marketbotai.com/home');
}
//}
next();
});
*/
