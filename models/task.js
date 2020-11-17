const mysql = require('mysql');
const option =require('../config/config.js');

module.exports = class Rows {
    static selectRows() {
        const pool = mysql.createPool(option);
        let sorter = 'data';
        let sql = 'SELECT * FROM comment';
        sql = sql + mysql.escapeId(sorter);
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            else {
                connection.query(sql, function (error, results, fields) {
                    console.log(results);
                    pool.end();
                    //connection.release();
                });
            }
        });
    }

    static insertRows(prodId, userName, commentUser) {
        const pool = mysql.createPool(option);
         prodId = parseInt(prodId);
        let sql = "INSERT  INTO comment (product_id, user,comment) VALUES (?,?,?)";
        const data = [prodId, userName, commentUser];
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            else {
                connection.query(sql, data, function (error, results, fields) {
                    console.log('Запись добавлена');
                    pool.end();
                    //connection.release();
                })
            }
        });

    }

    static deleteRows(id) {
        const pool = mysql.createPool(option);
        let sql = "DELETE FROM comment WHERE id =" + id;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            else {
                connection.query(sql, function (error, results, fields) {
                    console.log('Запись удалена');
                    pool.end();
                    //connection.release();
                })
            }
        });

    }

    static updateRows(id, prodId, userName, commentUser) {
        const pool = mysql.createPool(option);
       let userId = parseInt(id);
        prodId = parseInt(prodId);
        userName = String(userName);
        commentUser = String(commentUser);
        let sql = "UPDATE comment SET product_id=?,user=?,comment=? WHERE id=" + userId;
        let data = [prodId,userName,commentUser];
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            else {
                connection.query(sql,data, function (error, results, fields) {
                    console.log('Запись обновлена');
                    pool.end();
                    //connection.release();
                })
            }
        });
    }
}
