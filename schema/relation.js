module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Relation', {
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
      _result: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'relation',
      paranoid: true // Soft deletion
    })
  }
  