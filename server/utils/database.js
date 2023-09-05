const mysql = require("mysql2");

let pool = mysql.createPool({
    database: "users-data",
    host: "localhost",
    user: "root",
    password: "290802",
    port: 3306,
});

module.exports = pool.promise();
