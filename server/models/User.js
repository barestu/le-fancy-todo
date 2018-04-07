const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema ({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  gender: {type: String, default: '-'},
  birthday: {type: Date, default: '1970-03-22'}
},{
  timestamps: true
})

let User = mongoose.model('User', userSchema)

module.exports = User