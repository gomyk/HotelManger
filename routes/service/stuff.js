function Stuff(){
  this.name = '';
  this.date = '';
  this.room = '';
}


Stuff.prototype.printinfo = function printinfo(){
  console.log("room:",this.room);
  console.log("name:",this.name);
  console.log("date:",this.date);
}
Stuff.prototype.setData = function(data) {
  this.room = data.room;
  this.name = data.name;
  this.date = data.date;
};
Stuff.prototype.getData = function() {
  var data = {room:this.room,name:this.name,date:this.date};
  return data;
};
module.exports = Stuff;
