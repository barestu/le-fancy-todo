const User = require('../models/User')

module.exports = {
  register: function(req, res) {
    res.status(201).send({
      message: 'success'
    })
  },

  login: function(req, res) {
    res.status(200).send({
      message: 'success'
    })
  }
}