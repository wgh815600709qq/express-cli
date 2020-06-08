module.exports = function (sequelize, DataTypes) {
    return sequelize.define('PerformanceLogs', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      methods: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      tableName: 'performance_logs',
      paranoid: true // Soft deletion
    })
  }
  