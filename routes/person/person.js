function Person(){
  this.name;
  this.email;
}

Person.prototype.setname = function setname(name){
  this.name = name;
}
Person.prototype.setemail = function setemail(email){
  this.email = email;
}

module.exports = Person;
