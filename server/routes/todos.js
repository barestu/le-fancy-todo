const { loginAuth, adminAuth } = require('../middleware/auth')
const { showTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todos_controller')
const router = require('express').Router()

router.get('/', loginAuth, showTodo)
      .post('/add', adminAuth, addTodo)
      .put('/update', loginAuth, updateTodo)
      .delete('/delete', loginAuth, deleteTodo)

module.exports = router