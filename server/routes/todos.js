const { loginAuth, adminAuth } = require('../middleware/auth')
const { findMine, findAll, findOne, add, update, remove } = require('../controllers/todos_controller')
const router = require('express').Router()

router.get('/', loginAuth, findMine)
      .get('/all', adminAuth, findAll)
      .get('/search/:id', adminAuth, findOne)
      .post('/add', loginAuth, add)
      .put('/update/:id', loginAuth, update)
      .delete('/delete/:id', loginAuth, remove)

module.exports = router