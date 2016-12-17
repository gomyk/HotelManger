var Room = require('./room')
,inherits = require('util').inherits;

function Deluxe(){
  Room.call(this);
}

inherits(Deluxe,Room);

Deluxe.prototype.printinfo = function printinfo(){
  console.log("Deluxe");
}
module.exports = Deluxe;
