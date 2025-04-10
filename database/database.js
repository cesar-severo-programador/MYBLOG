const Sequelize = require('sequelize');


//connection
const connection = new Sequelize('myblog', 'root', 'rasec123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;