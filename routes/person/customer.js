var Person = require('./person')
,inherits = require('util').inherits;

function Customer(){
  Person.call(this);
  this.id = '';
  this.password = '';
  this.pint = '';
}

inherits(Customer,Person);

Customer.prototype.printinfo = function printinfo(){
  console.log("name:",this.name);
  console.log("id:",this.id);
  console.log("password:",this.password);
  console.log("email:",this.email);
  console.log("point:",this.point);
}
Customer.prototype.setData = function(data) {
  this.name = data.name;
  this.id = data.id;
  this.password = data.password;
  this.email = data.email;
  this.point = data.point;
};
Customer.prototype.getData = function() {
  var data = {name:this.name,id:this.id,email:this.email,vippoint:this.point};
  return data;
};
module.exports = Customer;
