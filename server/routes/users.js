const { register, login, fbLogin , findAll, findOne } = require('../controllers/users_controller')
const { loginAuth, adminAuth } = require('../middleware/auth')
const router = require('express').Router()

router.post('/register', register)
      .post('/login', login)
      .post('/fb-login', fbLogin)
      .get('/data', adminAuth, findAll)
      .get('/data/:id', adminAuth, findOne)

module.exports = router