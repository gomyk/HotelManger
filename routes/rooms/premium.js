var Room = require('./room')
,inherits = require('util').inherits;

function Premium(){
  Room.call(this);
}

inherits(Premium,Room);

Premium.prototype.printinfo = function printinfo(){
  console.log("Premium");
}
module.exports = Premium;
