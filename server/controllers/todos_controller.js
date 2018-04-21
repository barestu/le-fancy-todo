const Todo = require('../models/Todo')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = {
  findMine: function(req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)

    Todo.find({
      user: decoded.token._id
    })
    .then(todos => {
      res.status(200).send({
        message: 'Show my todos',
        todos: todos
      })
    })
    .catch(err => {
      res.status(500).send({
        message: 'Get data failed',
        err: err.message
      })
    })
  },

  findAll: function(req, res) {
    Todo.find()
    .populate('user', ['name'])
    .then(todos => {
      res.status(200).send({
        message: 'Show all todo on apps',
        todos: todos
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
    Todo.findById({
      _id: req.params.id
    })
    .populate('user', ['name'])
    .then(todo => {
      res.status(200).send({
        message: 'Show todo data',
        todos: todo
      })
    })
    .catch(err => {
      res.status(500).send({
        message: 'Get data failed',
        err: err.message
      })
    })
  },

  add: function(req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)
    let newTodo = new Todo({
      user: decoded.token._id,
      task: req.body.taskName,
      due_date: req.body.dueDate
    })

    newTodo.save()
    .then(success => {
      User.findOneAndUpdate({
        _id: decoded.token._id
      }, {
        $push: {todos: newTodo._id}
      })
      .then(success => {
        res.status(201).send({
          message: 'Add todo success!',
          todo: newTodo
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Add todo failed!',
          error: err.message
        })  
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Add todo failed!',
        error: err.message
      })
    })
  },

  update: function(req, res) {
    console.log('HERE')

    Todo.findOneAndUpdate({
      _id: req.params.id
    },{
      task: req.body.task,
      done: req.body.done,
      due_date: req.body.due_date
    })
    .then(success => {
      res.status(201).send({
        message: 'Update todo success!',
        data: req.body
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Update todo failed!',
        error: err.message
      })
    })
  },

  remove: function(req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, secret)

    Todo.deleteOne({
      _id: req.params.id
    })
    .then(deleted => {
      User.findOneAndUpdate({
        _id: decoded.token._id
      },{
        $pull: {todos: req.params.id}
      })
      .then(deleted => {
        res.status(200).send({
          message: 'Delete todo success!',
          data: deleted
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Delete todo failed!',
          data: err.message
        })  
      })
    })
    .catch(err => {
      res.status(400).send({
        message: 'Delete todo failed!',
        data: err.message
      })
    })
  }
}