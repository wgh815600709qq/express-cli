module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Logs', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_agent: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false      
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      random_string: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sign: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      tableName: 'logs',
      paranoid: true // Soft deletion
    })
  }
  