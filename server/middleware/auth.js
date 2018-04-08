const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

module.exports = {
  loginAuth: function(req, res, next) {
    let token = req.headers.token
    
    if (token) {
      jwt.verify(token, secret, function(err, decoded) {
        if (decoded) {
          next()
        } else {
          res.status(401).send({
            message: 'Illegal authentication detected!'
          })
        }
      })
    } else {
      res.status(401).send({
        message: 'Login authentication required!'
      })
    }
  },

  adminAuth: function(req, res, next) {
    let token = req.headers.token
    
    if (token) {
      jwt.verify(token, secret, function(err, decoded) {
        if (decoded.role === 'admin') {
          next()
        } else {
          res.status(401).send({
            message: 'Unauthorized user!'
          })
        }
      })
    } else {
      res.status(401).send({
        message: 'Login authentication required!'
      })
    }
  }
}