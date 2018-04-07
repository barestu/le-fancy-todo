const { showTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todos_controller')
const router = require('express').Router()

router.get('/', showTodo)
      .post('/add', addTodo)
      .put('/update', updateTodo)
      .delete('/delete', deleteTodo)

module.exports = router