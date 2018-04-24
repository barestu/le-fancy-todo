const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

let userSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'required!']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'required!'],
    match: [/\S+@\S+\.\S+/, 'Invalid email format!']
  },
  password: {
    type: String,
    required: [true, 'required!'],
    match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/, 'Password length should be atleast 6 alhpa-numeric characters!']
  },
  role: {
    type: String,
    default: 'user'
  },
  gender: {
    type: String,
    default: null
  },
  birthday: {
    type: Date,
    default: '1970-01-01'
  },
  todos: [{
    type: Schema.Types.ObjectId, ref: 'Todo'
  }]
},{
  timestamps: true
})

userSchema.pre('save', function(next) {
  if (this.password == undefined) {
    this.password = Math.random()
  }
  
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(this.password, salt)

  this.password = hash

  next()
});

let User = mongoose.model('User', userSchema)

module.exports = User