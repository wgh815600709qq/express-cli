const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs') // hash encryption
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const publicKey = fs.readFileSync(path.join(__dirname, '../config/publicKey.pub'))
var { success, fail } = require('../config/code-msg.js')
var { queryAll, add, queryByOne, deleteByOne, editById } = require('../module/admin.js')

router.get('/queryAll', async (req, res, next) => {
  try {
    let result = await queryAll()
    if (result) {
      res.send(Object.assign(success, {data: result}))
    } else {
      res.send(Object.assign(fail, {data: null}))
    }
  } catch(err) {
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    let data = {
      _username: req.body.username,
      _password: req.body.password,
      _name: req.body.name
    }
    let result = await add(data)
    if (result) {
      res.send(Object.assign(success, {data: result}))
    } else {
      res.send(Object.assign(fail, {data: null}))
    }
  } catch (err) {
    next(err)
  }
})

router.get('/query', async (req, res, next) => {
  try {
    let result = await queryByOne(req.query)
    if (result) {
      res.send(Object.assign(success, {data: result}))
    } else {
      res.send(Object.assign(fail, {data: null}))
    }
  } catch (err) {
    next(err)
  }

})

router.post('/delete', async (req, res, next) => {
  try {
    let result = await deleteByOne(req.body)
    if (result) {
      res.send(Object.assign(success, {data: null}))
    } else {
      res.send(Object.assign(illegal, {data: null}))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/edit/:id', async (req, res, next) => {
  try {
    let result = await editById(req.params.id, req.body)
    if (result[0]) {
      res.send(Object.assign(success, {data: null}))
    } else {
      res.send(Object.assign(fail, {data: null}))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    var { password } = req.body
    let result = await queryByOne({_username: req.body.username})
    if (result) {
      if (!bcrypt.compareSync(password, result._password)) {
        res.send({code: 'Y501', msg: 'password error'})
      } else {
        // sign token
        let token = jwt.sign(result._username, publicKey)
        result.dataValues.token = token
        req.session.user = result
        res.send({code: 'Y501', msg: 'success login', data: result, token: token})
      }
    } else {
      res.send({code: 'Y501', msg: 'user is not exist'})
    }
  } catch (err) {
    next(err)
  }
})

export default router
