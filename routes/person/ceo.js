var Person = require('./person')
,inherits = require('util').inherits;

function CEO(){
  this.who = 'CEO';
  this.id = 'gomyk'
  this.password = 'ansdbrud12'
}
CEO.prototype.getid = function getid(){
  return this.id;
}
CEO.prototype.getpassword = function getpassword(){
  return this.password;
}
module.exports = CEO;
