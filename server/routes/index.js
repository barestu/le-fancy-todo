const router = require('express').Router()

router.get('/', function(req, res) {
  res.status(200).send('Todo Fancy')
})

module.exports = router