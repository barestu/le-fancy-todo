const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.JWT_SECRET
const saltRounds = 10

module.exports = {
  register: function(req, res) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          gender: req.body.gender,
          birthday: req.body.birthday
        })

        newUser.save()
        .then(user => {
          res.status(201).send({
            message: 'Register success!',
            data: user
          })
        })
        .catch(err => {
          res.status(400).send({
            message: 'Register failed!',
            detail: err
          })
        })
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
            birthday: userData.birthday
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