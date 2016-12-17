function Room(){
  this.number = '';
  this.clean = false;
  this.reserved = false;
  this.name='';
  this.facility = true;
}
Room.prototype.printinfo = function printinfo(){
  console.log("name:",this.name);
  console.log("clean:",this.clean);
  console.log("reserved:",this.reserved);
  console.log("name:",this.name);
  console.log("facility:",this.facility);
}
Room.prototype.setdata = function setdata(data){
  this.number = data.number;
  this.clean = data.clean;
  this.reserved = data.reserved;
  this.name=data.name;
  this.facility = data.facility;
}
Room.prototype.getdata = function getdata(){
  var data = {number:this.number,clean:this.clean,reserved:this.reserved,name:this.name,facility:this.facility};
  return data;
}

module.exports = Room;
