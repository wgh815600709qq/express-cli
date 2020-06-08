
// 关联表

var { connection, Sequelize } = require('../database/connect.js')
const relationModel = require('../schema/relation.js')
var Relation = relationModel(connection, Sequelize)

async function queryAll(data) {
  let res = await Relation.findAll({
      where: data
  })
  return res
}


export {
  queryAll
}
