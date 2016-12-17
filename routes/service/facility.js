function Facility(){
  this.room = '';
  this.kind = 3;
  this.remain = 100;
}


Facility.prototype.printinfo = function printinfo(){
  console.log("room:",this.room);
  console.log("kind:",this.kind);
  console.log("remain:",this.remain);
}
Facility.prototype.setData = function(data) {
  this.room = data.room;
  this.kind = data.kind;
  this.remain = data.reamin;
};
Facility.prototype.getData = function() {
  var data = {room:this.room,kind:this.kind,remain:this.remain};
  return data;
};
module.exports = Facility;
