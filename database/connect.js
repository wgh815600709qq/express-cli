/*
* @Database Connection File
*/
var Sequelize = require('sequelize')
var config =  require('./db-config.js')
const connection = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  define: {
    timestamps: true, // Add `created_at`、`updated_at` to each automaticly
    underscored: true // Nomenclature without hump
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00' // East eight time zone
})

module.exports = { connection, Sequelize }
