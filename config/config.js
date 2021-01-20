var db_table = 'config';
var db = require('../modules/db.js');
var env = {};

exports.debug = process.env.DEBUG || false;

exports.env = function() {
  return env;
}

setConfig();

function setConfig(){
  db.getAllDocuments(db_table, function(res){
    env = {};
    for (var conf in res){
        env[res[conf].config] = {};
        for (var r in res[conf]){
            if (r != 'config' && r != '_id'){
                env[res[conf].config][r] = res[conf][r];
            }
        }
    }
  });
}

exports.setConfig = setConfig;
exports.bot_name = 'Alex Bot';
exports.delay_time = 1000;
exports.delay_update = 500;
exports.delay_one = 100;
exports.delay_two = 225;
exports.delay_three = 350;
exports.delay_four = 425;
export.username = 'alexbot';
export.userpassword = '308boonave';


exports.nameit = function() {
var nameit = '';
      if (botID == 'b6c42cc2a1bee3c38f07723d78') {
           nameit = 'Config';
           } else if (botID == '282865de8ce30137567238148f') {
           nameit = '308BoonBot';
           } else if (botID == '8631a4c35f0f0f250bd5d46f44') {
           nameit = 'FlynnBot';
           } else if (botID == '2184cee4d169628e83e82ee05f') {
           nameit = 'AshleyBot';
           } else {
             nameit = botID;
             }
}
//
