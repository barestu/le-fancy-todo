const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 4000

const userRoutes = require('./routes/users')
const todoRoutes = require('./routes/todos')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

mongoose.connect(`mongodb://localhost/todo-fancy`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to database...')
})

app.use('/user', userRoutes)
app.use('/todo', todoRoutes)

app.listen(port, function() {
  console.log('Listening on port', port)
})