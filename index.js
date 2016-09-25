var argv = require('argv').run();
var keypress = require('keypress');
var conf = require('./lib/conf');
var ctrls = require('./ctrls.json');
var Func = require('./func');
var zone = "";
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

if(argv.targets[0] === 'init'){
  conf.init()
}
else{

  var zones = ctrls.map(function(e){return e.zone});



  process.stdin.setRawMode(true)
  process.stdin.on('keypress', function(ch, key){
    validate(key);
    console.log(key);
    try{
        execute(key);
    }catch(e){}
  })
}

function validate(key){
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
    process.exit(0);
  }
}

// listen for the "keypress" event
function execute(key){
  keyname = key.name || null;
  l_zone = setzone(keyname);
  console.log(l_zone);
  console.log(keyname);
  var events = ctrls.filter(function(e){ return e.zone === l_zone })[0];
  var e = events.events.filter(function(e){return e.key === keyname})[0];
  console.log(e);
  execute_cmd(e.cmd);
}


function setzone(key){
  if(zones.indexOf(key) >= 0){
    zone = key;
  }
  return zone;
}

function execute_cmd(cmd){
  console.log("execute this command: ", cmd);
  Func[cmd]();
}
