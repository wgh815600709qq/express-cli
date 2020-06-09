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
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true      
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      timestamp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      random_string: {
        type: DataTypes.STRING,
        allowNull: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sign: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    }, {
      tableName: 'logs',
      paranoid: true // Soft deletion
    })
  }
  