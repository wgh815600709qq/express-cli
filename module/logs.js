var { connection, Sequelize } = require('../database/connect.js')
const logsModel = require('../schema/logs.js')
var Logs = logsModel(connection, Sequelize)
// const relationModel = require('../schema/relation.js')
// var Relation = relationModel(connection, Sequelize)
// const messageModel = require('../schema/message.js')
// var Message = messageModel(connection, Sequelize)
async function queryAll() {
  let res = await Logs.findAll()
  return res
}

async function queryByOne(data) {
  let res = await Logs.findOne({
    where: data
  })
  return res
}

async function add(data) {
  let res = await Logs.create(data)
  return res
}

async function deleteByOne(data) {
  let res = await Logs.destroy({
    where: data
  })
  return res
}

async function editById(id, data) {
  let res = await Logs.update(data, {
    where: { id: id }
  })
  return res
}

// 模糊匹配[以及好友关系] 关系表内找到Relation.from_id == Logs.id || Relation.to_id == Logs.id的项_result === 1 非自己
async function fuzzyMatching(data) {
  let { username, userId } = data
  let res = await Logs.findAll({
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

async function analysisToData() {
  let total = await Logs.findAll()
  let result = {
    xAxis: [],
    series: []
  }
  // 总耗时
  let updateBills = total.filter(it => it.type == 'bill_update')
  // console.log(updateBills)
  let len = updateBills.length
  result.xAxis.push('总耗时')
  result.series.push(updateBills[len-1].timestamp - total[0].timestamp)
  // bill更新次数
  result.xAxis.push('Bill更新次数')
  result.series.push(len)
  // 接口耗时
  let fetchBegins = total.filter(it => it.type == 'fetch_begin')
  let fetchFinishs = total.filter(it => it.type == 'fetch_finish')
  for (var i = 0; i < fetchBegins.length; i ++) {
    let it = fetchBegins[i]
    let action = it.url.replace(/^[^?]+\?/g, '')
    let startTime = it.timestamp
    let endTime = fetchFinishs.find(its => its.url === it.url).timestamp
    result.xAxis.push(`接口：${action}`)
    result.series.push(endTime - startTime)
    // console.log(result)
  }
  // console.log(result)
  return result
}

export {
  queryAll,
  add,
  queryByOne,
  deleteByOne,
  editById,
  analysisToData,
//   fuzzyMatching,
//   applyFriend
}
