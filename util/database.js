/* Before Sequelize:
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'nodecomplete' 
});

module.exports = pool.promise();
*/

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete-sequelize', 'root', 'nodecomplete', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;