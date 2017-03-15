var light = require("./func");
var Bleacon = require('bleacon');
Bleacon.startScanning();
var stopped;
var on = false;
var uuid = "cca4e3c135154dff9e80d5e1b0a402cf";

Bleacon.on('discover', function(bleacon) {
   if(bleacon.uuid !== uuid)return;
   clearTimeout(stopped);
   stopped = setTimeout(farAway, 1000 * 60 * 5);
   if(!on){
     on = true;
     console.log("on");
     light.on();
   }
});

function farAway(){
  if(on){
    on = false;
    console.log("off");
    light.off();
  }
}
