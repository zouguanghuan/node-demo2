const mysql = require('mysql')

const connecttion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'node-start'
})

connecttion.connect()

module.exports = connecttion