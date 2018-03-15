var { connection, Sequelize } = require('../database/connect.js')
const adminModel = require('../schema/admin.js')
var Admin = adminModel(connection, Sequelize)

async function queryAll () {
  let res = await Admin.findAll({
    attributes: ['name', '_username', 'id']
  })
  return res
}

async function queryByOne (data) {
  let res = await Admin.findOne({
    where: data
  })
  return res
}

async function add (data) {
  let res = await Admin.create(data)
  return res
}

async function deleteByOne (data) {
  let res = await Admin.destroy({
    where: data
  })
  return res
}

async function editById (id, data) {
  let res = await Admin.update(data, {
    where: {id: id}
  })
  return res
}

export {
  queryAll,
  add,
  queryByOne,
  deleteByOne,
  editById
}
