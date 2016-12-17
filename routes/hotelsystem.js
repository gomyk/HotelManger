var serviceManagers = require('./servicemanager')
var employeeManagers = require('./employeemanager')
var roomManagers = require('./roommanager')
var companyManagers = require('./companymanager')
var stuffManagers = require('./stuffmanager')
var saleManagers = require('./salemanager')
var Ceo = require('./person/ceo')
var employee = require('./person/employee')
var check;
function HotelSystem(){
  this.list = []; // 승인리스트
  this.who = 'HotelSystem';
  this.ceo = new Ceo;
  this.employeecount = 0;
  this.employeeManager = new employeeManagers;
  this.serviceManager = new serviceManagers;
  this.roomManager = new roomManagers;
  this.companyManager = new companyManagers;
  this.stuffManager = new stuffManagers;
  this.saleManager = new saleManagers;
  this.employeelist = [];
}
HotelSystem.prototype.changewho = function changwho(str){
  this.who = str;
  console.log('바뀐 who : ',this.who);
}
HotelSystem.prototype.printwho = function printwho(){
  console.log('현재 who : ',this.who);
}
HotelSystem.prototype.serviceManage = function serviceManage(service,reserv){
  console.log(this.who);
  if(service == "reservation"){
      this.serviceManager.reservation(reserv);
  }
  else if (service == "deletereserv"){
    this.serviceManager.deletereserv(reserv);
  }
}
HotelSystem.prototype.employeeManage = function employeeManage(service,emp){
  if(service == "add"){
      this.employeeManager.addEmployee(emp);
  }
  else if(service == "delete"){
      this.employeeManager.deleteEmployee(emp);
  }
  else if(service == "update"){
    this.employeeManager.updateEmployee(emp);
  }
}
HotelSystem.prototype.roomManage = function roomManage(service,room){
  if(service == "add"){
      this.roomManager.addRoom(room);
  }
  else if(service == "delete"){
      this.roomManager.deleteRoom(room);
  }
  else if(service == "update"){
    this.roomManager.updateRoom(room);
  }
}
HotelSystem.prototype.companyManage = function companyManage(service,company){
  if(service == "add"){
      this.companyManager.addCompany(company);
  }
  else if(service == "delete"){
      this.companyManager.deleteCompany(company);
  }
  else if(service == "update"){
    this.companyManager.updateCompany(company);
  }
}
HotelSystem.prototype.stuffManage = function stuffManage(service,stuff){
  if(service == "add"){
      this.stuffManager.addStuff(stuff);
  }
  else if(service == "delete"){
      this.stuffManager.deleteStuff(stuff);
  }
  else if(service == "update"){
    this.stuffManager.updateStuff(stuff);
  }
}
HotelSystem.prototype.saleManage = function saleManage(service,sale){
  if(service == "add"){
      this.saleManager.addSale(sale);
  }
  else if(service == "delete"){
      this.saleManager.deleteSale(sale);
  }
}
HotelSystem.prototype.second = function second(){
  console.log('HotelSystem 두번째 함수');
}
module.exports = HotelSystem;
