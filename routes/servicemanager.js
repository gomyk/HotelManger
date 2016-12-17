var reservationSys = require('./reservationsystem')
var cleanSys = require('./service/clean')
var facilitySys = require('./service/facility')
var mealSys = require('./service/meal')
var stuffSys = require('./service/stuff')
var qnaSys = require('./service/qna')
var data;
function ServiceManager(){

  this.who = '서비스매니저';
  this.reservationSystem = new reservationSys();
  this.clean = new cleanSys();
  this.cleanlist = [];
  this.facility = new facilitySys();
  this.facilitylist = [];
  this.meal = new mealSys();
  this.meallist=[];
  this.qna = new qnaSys();
  this.qnalist = [];
  this.stuff = new stuffSys();
  this.stufflist = [];
}

ServiceManager.prototype.reservation = function reservation(reserv){
  console.log(this.who);
  this.reservationSystem.reserveRoom(reserv);
}
ServiceManager.prototype.deletereserv = function deletereserv(reserv){
  this.reservationSystem.deleteReservation(reserv);
}
ServiceManager.prototype.second = function second(){
  console.log('서비스매니저 두번째 함수');
}
///////////////////추가
ServiceManager.prototype.addClean = function addClean(data){
  this.clean.setData(data);
}
ServiceManager.prototype.addfacility = function addfacility(data){
  this.facility.setData(data);
}
ServiceManager.prototype.addmeal = function addmeal(data){
  this.meal.setData(data);
}
ServiceManager.prototype.addqna = function addqna(data){
  this.qna.setData(data);
}
ServiceManager.prototype.addstuff = function addstuff(data){
  this.stuff.setData(data);
}
module.exports = ServiceManager;
