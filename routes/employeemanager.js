//var reservationSys = require('./reservationsystem')
//var reservationSystem = new reservationSys();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var express = require('express');
var router = express.Router();
var login = true;
var check ;
var insertDB = db.prepare("INSERT INTO CUSTOMER VALUES (?,?,?,?,?,?)");
var updateDB = db.prepare("UPDATE CUSTOMER SET PASSWORD = ?,NAME = ?,EMAIL = ?,POINT = ?,GRADE = ? WHERE ID = ?");
var deleteDB = db.prepare("DELETE FROM CUSTOMER WHERE ID = ?");
function EmployeeManager(){
  this.who = '직원매니저';
}

EmployeeManager.prototype.addEmployee = function addEmployee(emp){
    check = true;
      console.log(emp);
      db.serialize(function () {
        db.each("SELECT COUNT(*) as RESULT FROM CUSTOMER WHERE ID = ?",emp.id,function(err, row) {
          console.log('row:',row.RESULT);
          if(row.RESULT != 0){
          check = false;
          }
          if(check){
            insertDB.run(emp.id,emp.password,emp.name,emp.email,emp.salary,emp.autho);
              console.log('DB:',"성공");
          //  updateDB.run();
            return true;
          }
          else{
            console.log('DB:',"실패");
            return false;
          }
        });
      });
}

EmployeeManager.prototype.deleteEmployee = function deleteEmployee(emp){
  check = true;
    console.log(emp);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM CUSTOMER WHERE ID = ?",emp.id,function(err, row) {
        console.log('row:',row.RESULT);
        if(row.RESULT != 0){
        check = false;
        }
        if(check){
        //  insertDB.run(emp.id,emp.password,emp.name,emp.email,emp.autho,emp.salary);
            console.log('DBdelete:',"실패");

        }
        else{
          //updateDB.run(emp.set,emp.data,emp.id);
            deleteDB.run(emp.id);
        //  deleteDB.run(emp.name);
          console.log('DBdelete:',"성공");
        }
      });
    });
}
EmployeeManager.prototype.updateEmployee = function updateEmployee(emp){
  check = true;
    console.log(emp);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM CUSTOMER WHERE ID = ?",emp.id,function(err, row) {
        console.log('row:',row.RESULT);
        if(row.RESULT != 0){
        check = false;
        }
        if(check){
        //  insertDB.run(emp.id,emp.password,emp.name,emp.email,emp.autho,emp.salary);
            console.log('DBupdate:',"실패");

        }
        else{
          //updateDB.run(emp.set,emp.data,emp.id);
          updateDB.run(emp.password,emp.name,emp.email,emp.salary,emp.autho,emp.id);
        //  deleteDB.run(emp.name);
          console.log('DBupdate:',"성공");
        }
      });
    });
}
module.exports = EmployeeManager;
