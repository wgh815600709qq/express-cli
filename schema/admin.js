module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Admin', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    _username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    _password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    _name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'admin',
    paranoid: true // Soft deletion
  })
}
