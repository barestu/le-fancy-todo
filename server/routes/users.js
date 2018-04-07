const { register, login } = require('../controllers/users_controller')
const router = require('express').Router()

router.post('/register', register)
      .post('/login', login)

module.exports = router