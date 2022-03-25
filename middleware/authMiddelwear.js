const jwt = require('jsonwebtoken')
const User = require('../models/Post')

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded)

      // Get user from the token
      // req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(500).json({
        error: true,
        statusCode: 500,
        data: error,
        msg:"Not authorized"
    })
      
    }
  }

  // if (!token) {
  //   res.status(500).json({
  //     error: true,
  //     statusCode: 500,
  //     data: error,
  
  // })
    // res.status(401)
    // throw new Error('Not authorized, no token')
  // }
}

module.exports = protect 