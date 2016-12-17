//var reservationSys = require('./reservationsystem')
//var reservationSystem = new reservationSys();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var express = require('express');
var router = express.Router();
var login = true;
var check ;
var insertDB = db.prepare("INSERT INTO COMPANY VALUES (?,?,?)");
var updateDB = db.prepare("UPDATE COMPANY SET TEL = ?,FEE = ? WHERE NAME = ?");
var deleteDB = db.prepare("DELETE FROM COMPANY WHERE NAME = ?");
function CompanyManager(){
  this.who = '회사 매니져';
}

CompanyManager.prototype.addCompany = function addCompany(company){
    check = true;
      console.log(company);
      db.serialize(function () {
        db.each("SELECT COUNT(*) as RESULT FROM COMPANY WHERE NAME = ?",company.name,function(err, row) {
          console.log('row:',row.RESULT);
          if(row.RESULT != 0){
          check = false;
          }
          if(check){
            insertDB.run(company.name,company.tel,company.fee);
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

CompanyManager.prototype.deleteCompany = function deleteCompany(company){
  check = true;
    console.log(company);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM COMPANY WHERE NAME = ?",company.name,function(err, row) {
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
            deleteDB.run(company.name);
        //  deleteDB.run(emp.name);
          console.log('DBdelete:',"성공");
        }
      });
    });
}
CompanyManager.prototype.updateCompany = function updateCompany(company){
  check = true;
    console.log(company);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM COMPANY WHERE NAME = ?",company.name,function(err, row) {
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
          updateDB.run(company.tel,company.fee,company.name);
        //  deleteDB.run(emp.name);
          console.log('DBupdate:',"성공");
        }
      });
    });
}
module.exports = CompanyManager;
