const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const FB = require('fb')
const secret = process.env.JWT_SECRET

module.exports = {
  register: function(req, res) {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      birthday: req.body.birthday,
      role: req.body.role
    })

    newUser.save()
    .then(user => {
      res.status(201).send({
        message: 'Register success!',
        data: user
      })
    })
    .catch(err => {
      if (err.code === 11000) {
        err.message = 'Email already exist!'
      }
      res.status(400).send({
        error: 'Register failed!',
        detail: err.message
      })
    })
  },

  login: function(req, res) {
    let plainPassword = req.body.password

    User.findOne({
      email: req.body.email
    })
    .then(user => {
      bcrypt.compare(plainPassword, user.password, function(err, found) {
        if (found) {
          let token = jwt.sign({
            token: user
          }, secret)

          res.status(200).send({
            message: 'Login success',
            token: token
          })
        } else {
          res.status(400).send({
            message: 'Invalid password',
            detail: err
          })
        }
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Invalid email!'
      })
    })
  },

  fbLogin: function(req, res) {
    let token = req.headers.tokenfb

    FB.setAccessToken(token)
    FB.api('/me', {
      fields: ['email', 'name', 'birthday', 'gender']
    },
    function (response) {
      User.findOne({
        email: response.email
      })
      .then(user => {
        if (user !== null) {
          let token = jwt.sign({
            token: user
          }, secret)
  
          res.status(200).send({
            message: 'Account already registered, continue to login...',
            token: token
          })
        } else {
          let newUser = new User({
            name: response.name, 
            email: response.email,
            birthday: response.birthday,
            gender: response.gender
          })
  
          newUser.save()
          .then(user => {
            let token = jwt.sign({
              token: user
            }, secret)
  
            res.status(201).send({
              message: 'Register new account success, continue to login...',
              token: token
            })
          })
          .catch(error => {
            res.status(400).send({
              message: 'Login failed!',
              error: error.message
            })
          })
        }
      })
      .catch(err => {
        res.status(400).send({
          message: 'Login failed!',
          error: err.message
        })
      })
    })
  },

  findAll: function(req, res) {
    User.find()
    .populate('todos', ['task'])
    .then(user => {
      res.status(200).send({
        message: 'Show all users',
        data: user
      })
    })
    .catch(err => {
      res.status(500).send({
        message: 'Get data failed',
        err: err.message
      })
    })
  },

  findOne: function(req, res) {
    User.findById({
      _id: req.params.id 
    })
    .populate('todos')
    .then(user => {
      res.status(200).send({
        message: 'Show user data',
        data: user
      })
    })
    .catch(err => {
      res.status(500).send({
        message: 'Get data failed',
        err: err.message
      })
    })
  }
}