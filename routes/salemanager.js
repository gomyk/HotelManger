//var reservationSys = require('./reservationsystem')
//var reservationSystem = new reservationSys();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('TEST.db');
var express = require('express');
var router = express.Router();
var login = true;
var check ;
var insertDB = db.prepare("INSERT INTO SALE VALUES (?,?,?,?)");
var deleteDB = db.prepare("DELETE FROM SALE WHERE NAME = ? AND DATE = ?");
function SaleManager(){
  this.who = '매출매니저';
  this.list = [];
  this.sum = 0;
}

SaleManager.prototype.addSale = function addSale(sale){
    check = true;
      console.log(sale);
      db.serialize(function () {
        db.each("SELECT COUNT(*) as RESULT FROM SALE WHERE NAME = ? AND DATE = ?",sale.name,sale.date,function(err, row) {
          console.log('row:',row.RESULT);
          if(row.RESULT != 0){
          check = false;
          }
          if(check){
            insertDB.run(sale.count,sale.name,sale.plus,sale.date);
            if(sale.plus == 'plus'){
                this.sum += sale.count;
            }
            else{
              this.sum -= sale.count;
            }
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

SaleManager.prototype.deleteSale = function deleteSale(sale){
  check = true;
    console.log(sale);
    db.serialize(function () {
      db.each("SELECT COUNT(*) as RESULT FROM SALE WHERE NAME = ? AND DATE = ?",sale.name,sale.date,function(err, row) {
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
            deleteDB.run(sale.name,sale.date);
        //  deleteDB.run(emp.name);
          console.log('DBdelete:',"성공");
        }
      });
    });
}
module.exports = SaleManager;
