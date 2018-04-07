const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
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
    .then(userData => {
      bcrypt.compare(plainPassword, userData.password, function(err, found) {
        if (found) {
          let token = jwt.sign({
            name: userData.name,
            email: userData.email,
            gender: userData.gender,
            birthday: userData.birthday,
            role: userData.role
          }, secret)

          res.status(200).send({
            message: 'Login success',
            data: token
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
  }
}