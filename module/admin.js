var { connection, Sequelize } = require('../database/connect.js')
const adminModel = require('../schema/admin.js')
var Admin = adminModel(connection, Sequelize)
const relationModel = require('../schema/relation.js')
var Relation = relationModel(connection, Sequelize)
const messageModel = require('../schema/message.js')
var Message = messageModel(connection, Sequelize)
async function queryAll() {
  let res = await Admin.findAll({
    attributes: ['name', '_username', 'id']
  })
  return res
}

async function queryByOne(data) {
  let res = await Admin.findOne({
    where: data
  })
  return res
}

async function add(data) {
  let res = await Admin.create(data)
  return res
}

async function deleteByOne(data) {
  let res = await Admin.destroy({
    where: data
  })
  return res
}

async function editById(id, data) {
  let res = await Admin.update(data, {
    where: { id: id }
  })
  return res
}

// 模糊匹配[以及好友关系] 关系表内找到Relation.from_id == Admin.id || Relation.to_id == Admin.id的项_result === 1 非自己
async function fuzzyMatching(data) {
  let { username, userId } = data
  let res = await Admin.findAll({
    where: {
      $and: {
        id: {
          $ne: userId
        },
        $or: [
          {
            _username: {
              $like: `${username}%`
            }
          },
          {
            _name: {
              $like: `${username}%`
            }
          }
        ]
      }
    }
  })
  // 若找到符合条件的去关系表遍历把其间关系带上
  if (res.length) {
    for (var i = 0; i < res.length; i++) {
      let item = res[i]
      let match = await Relation.findAll({
        where: {
          $or: [
            {
              from_id: {
                $eq: item.id
              },
              to_id: {
                $eq: userId
              }
            },
            {
              from_id: {
                $eq: userId
              },
              to_id: {
                $eq: item.id
              }
            }
          ]
        }
      })
      if (match && match.length && match[0]._result === '1') {
        item.dataValues.is_friend = true
      } else {
        item.dataValues.is_friend = false
      }
    }
  }
  return res
}

/* 申请好友
 *  生成关系表
 *  发送消息
 *  socket链接TODO
*/
async function applyFriend(data) {
  return connection.transaction(t => {
    return Relation.create({
      from_id: data.fromId,
      to_id: data.toId,
      _result: 0
    }, { transaction: t }).then(relation => {
      return Message.create({
        from_id: data.fromId,
        to_id: data.toId,
        _type: 0,
        _content: `昵称:${data.name} 号码:${data.ww}请求添加你为好友。`
      })
    })
  }).then(res => {
    return { code: 'Y200', msg: 'OK'}
  }).catch(err => {
    return { code: 'Y500', err: err }
  })
}

export {
  queryAll,
  add,
  queryByOne,
  deleteByOne,
  editById,
  fuzzyMatching,
  applyFriend
}
