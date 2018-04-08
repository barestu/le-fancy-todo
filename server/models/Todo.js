const mongoose = require('mongoose')
const Schema = mongoose.Schema

let todoSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  task: {
    type: String, 
    required: [true, 'required!']
  },
  done: {
    type: Boolean, 
    default: false
  },
  due_date: {
    type: Date, 
    required: true
  }
},{
  timestamps: true
})

let Todo = mongoose.model('Todo', todoSchema)

todoSchema.pre('findOneAndUpdate', function() {
  console.log('BEFORE UPDATE')
})

module.exports = Todo