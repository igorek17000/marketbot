
var commands;
var getIpData = require('../modules/ipdata.js');
var db_table;
var db_table2;
var db_table3;



function getAllDocuments() {
  dbt.getAllDocuments(db_table, function(res){
    commands = res;
  });
}

function getAllDocuments() {
  dbt.getAllDocuments(db_table2, function(res){
    commands = res;
  });
}

function getAllDocuments() {
  dbt.getAllDocuments(db_table3, function(res){
    commands = res;
  });
}

function addToDB(cmd, callback) {
  dbt.addDoc(db_table, cmd, callback);
}

function updateToDB(cmd, callback) {
  dbt.updateOneDoc(db_table, {"name": cmd.name}, {$set: { "description": cmd.description}}, callback);
}

async function addCmd(getAllDocuments, callback) {
var ipdata = await getIpData(ip);
var is_ip = ipdata.ip;
//  var reqIP = request.text;
getAllDocuments();
    for (cmd in commands) {
      if (commands[cmd].ip == is_ip) {
    var msg = true;
        callback(true, msg);
        getAllDocuments2();

        for (cmd in commands) {
          if (commands[cmd].ip == is_ip) {
        var msg = true;
            callback(true, msg);
getAllDocuments3();
            for (cmd in commands) {
              if (commands[cmd].ip == is_ip) {
            var msg = true;
                callback(true, msg);

        return msg;
        }
          return msg;
        }
          return msg;
        }
      }
    }

    var alexbHash = {
      name: val[1].toLowerCase(),
      regex: "^\/" + val[1] + "$",
      message: val[2],
      match: Object.values(match[1]),
      bots: Object.keys(bots),
      date: date
    };

    alexbot.push(alexbHash);
    addAlexBotToDB(alexbHash);


    var msg = "AlexBot command added! Use '/alexbot describe " + val[1] + "' to add a description";
    callback(true, msg, []);
//console.log('Result: ' + ${match[1]});
    return msg;

}
}
