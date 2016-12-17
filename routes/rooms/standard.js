var Room = require('./room')
,inherits = require('util').inherits;

function Standard(){
  Room.call(this);
}

inherits(Standard,Room);

Standard.prototype.printinfo = function printinfo(){
  console.log("standard");
}
module.exports = Standard;
