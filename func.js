var Milight = require('node-milight-promise').MilightController;
var commands = require('node-milight-promise').commands2;

var light = new Milight({
        ip: "192.168.0.200",
        delayBetweenCommands: 75,
        commandRepeat: 2
    }),
zone = 2;


var mpd = require('mpd');
var cmd = mpd.cmd;
var client = mpd.connect({
  port: 6600,
  host: '192.168.0.136',
});
var toggle = false;
var music_toggle = false;

module.exports.light_toggle = function(){
  if(toggle)light.sendCommands(commands.white.on(zone));
  else light.sendCommands();
  toggle = !toggle;
  console.log("isOn? = " + toggle);
}

module.exports.light_up = function(){
  light.sendCommands(commands.white.brightUp())
}

module.exports.light_down = function(){
  light.sendCommands(commands.white.brightDown())
}

module.exports.light_cold = function(){
  light.sendCommands(commands.white.cooler())
  console.log("cold");
}

module.exports.light_warm = function(){
  light.sendCommands(commands.white.warmer())
  console.log("warm");
}

module.exports.music_toggle = function(){
  var command = "play";
  if(!music_toggle){
    command = "pause";
  }
  client.sendCommand(cmd(command, []), function(err, msg) {
    if (err) throw err;
    console.log(msg);
    music_toggle = !music_toggle;
  });
}

module.exports.music_next = function(){
  client.sendCommand(cmd("next", []), function(err, msg) {
    if (err) throw err;
    console.log(msg);
  });
}

module.exports.music_prev = function(){
  client.sendCommand(cmd("previous", []), function(err, msg) {
    if (err) throw err;
    console.log(msg);
  });
}
