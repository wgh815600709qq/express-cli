module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Message', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      from_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      to_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      _content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      _type: {
        type: DataTypes.INTEGER,
        allowNull: false  
      }
    }, {
      tableName: 'message',
      paranoid: true // Soft deletion
    })
  }
  