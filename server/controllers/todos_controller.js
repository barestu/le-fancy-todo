const Todo = require('../models/Todo')

module.exports = {
  showTodo: function(req, res) {
    res.status(200).send({
      message: 'success'
    })
  },

  addTodo: function(req, res) {
    res.status(201).send({
      message: 'success'
    })
  },

  updateTodo: function(req, res) {
    res.status(201).send({
      message: 'success'
    })
  },

  deleteTodo: function(req, res) {
    res.status(200).send({
      message: 'success'
    })
  }
}