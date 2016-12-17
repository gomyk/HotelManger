var mysql = require('mysql');
var sqlite3 = require('sqlite3').verbose();
var connection = new sqlite3.Database('USER.db');

connection.get = function (table, id, callback) {
    connection.query("SELECT * FROM " + table + " WHERE id= ?", id, function (err, rows, fields) {
            if (err) throw callback(err, null);
            else callback(null, rows[0]);
        }
    )
}

connection.getbyorder = function (table, id, callback) {
    connection.query("SELECT * FROM " + table + " WHERE id= ? order by createdat", id, function (err, rows, fields) {
            if (err) throw callback(err, null);
            else callback(null, rows[0]);
        }
    )
}

connection.getAll = function (table, callback) {
    connection.query("SELECT * FROM " + table, function (err, result, fields) {
        if (err) throw callback(err, null);
        else callback(null, result);
    })

}
connection.insert = function (table, data, callback) {
    connection.query("INSERT INTO " + table + " SET ? ", data, function (err, result) {
            if (err)  callback(err);
            else callback(null);

        }
    )
}

module.exports = connection;
