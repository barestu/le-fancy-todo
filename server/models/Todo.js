const mongoose = require('mongoose')
const Schema = mongoose.Schema

let todoSchema = new Schema ({
  name: {type: String, required: true},
  done: {type: String, default: false},
  due_date: {type: Date, required: true}
},{
  timestamps: true
})

let Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo