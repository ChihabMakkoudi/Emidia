let mysql = require('mysql')

let con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MysqlData',
    database: 'Emidia2'
})
con.connect()

module.exports = con