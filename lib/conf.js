var fs = require('fs');
var ctrl_events = [];
var json = {'zone':null, 'events':[]}
var cancel = "";
var zone = "";
var func = "zone";


module.exports.init = function(){
  console.log(message[func]);
  process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
      process.stdin.pause();
      ctrl_events.push(json);
      save(ctrl_events, function(){
      })
    }else{
    funcs[func](key);
    console.log(message[func]);
    }
  })
  process.stdin.setRawMode(true);
  process.stdin.resume();
}
function save(obj,callback){
  fs.writeFile('./ctrls.json', JSON.stringify(obj),callback)
}

var funcs = {
  "cancel": function(key){
    cancel = key.name;
    func = "zone";
  },
  "zone": function(key){
    zone = key.name;
    json.zone = key.name;
    func = "event";
  },
  "event": function(key){
    var tmp = {}
    tmp.key = key.name;
    tmp.cmd = "";
    json.events.push(tmp);
  }
}

var message = {
  "cancel": "please type a cancel key",
  "zone": "please type a zone key",
  "event": "please type an event key"
};
