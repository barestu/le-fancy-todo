const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema ({
  email: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  gender: {type: String, default: '-'},
  birthdate: {type: Date, default: '1970-01-01'}
},{
  timestamps: true
})

let User = mongoose.model('User', userSchema)

module.exports = User