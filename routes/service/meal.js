function Meal(){
  this.room = '';
  this.kind = 3;
  this.remain = 100;
}


Meal.prototype.printinfo = function printinfo(){
  console.log("room:",this.room);
  console.log("kind:",this.kind);
  console.log("date:",this.date);
}
Meal.prototype.setData = function(data) {
  this.room = data.room;
  this.kind = data.kind;
  this.date = data.date;
};
Meal.prototype.getData = function() {
  var data = {room:this.room,kind:this.kind,date:this.date};
  return data;
};
module.exports = Meal;
