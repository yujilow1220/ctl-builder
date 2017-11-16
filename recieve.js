var light = require("./func");
var Bleacon = require('bleacon');
Bleacon.startScanning();
var stopped;
var on = false;
var uuid = "b9407f30f5f8466eaff9255512200912";

Bleacon.on('discover', function(bleacon) {
   if(bleacon.uuid !== uuid)return;
   clearTimeout(stopped);
   stopped = setTimeout(farAway, 1000 * 60 * 5);
   if(!on){
     on = true;
     light.on();
   }
});

function farAway(){
  if(on){
    on = false;
    light.off();
  }
}
