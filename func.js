var Milight = require("milight");
var milight = new Milight({
    host: "192.168.0.107",
    broadcast: true
});

var toggle = false;
var brightness = 100;

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
}
