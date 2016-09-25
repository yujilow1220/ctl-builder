var Milight = require("milight");
var milight = new Milight({
    host: "192.168.0.107",
    broadcast: true
});

var mpd = require('mpd');
var cmd = mpd.cmd;
var client = mpd.connect({
  port: 6600,
  host: 'localhost',
});

var toggle = false;
var brightness = 100;
var music_toggle = false;

module.exports.light_toggle = function(){
  if(toggle)milight.on();
  else milight.off();
  toggle = !toggle;
  console.log("isOn? = " + toggle);
}

module.exports.light_up = function(){
  brightness += 10;
  milight.brightness(brightness);
  console.log("brightness = " + brightness);
}

module.exports.light_down = function(){
  brightness -= 10;
  milight.brightness(brightness);
  console.log("brightness = " + brightness);
}

module.exports.light_cold = function(){
  console.log("cold");
}

module.exports.light_warm = function(){
  console.log("warm");
  console.log(cmd);
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
