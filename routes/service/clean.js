function Clean(){
  this.room = '';
  this.name = '';
}


Clean.prototype.printinfo = function printinfo(){
  console.log("room:",this.room);
  console.log("date:",this.name);
}
Clean.prototype.setData = function(data) {
  this.room = data.room;
  this.name = data.name;
};
Clean.prototype.getData = function() {
  var data = {room:this.room,name:this.name};
  return data;
};
module.exports = Clean;
