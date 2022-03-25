// eslint-disable-next-line import/no-extraneous-dependencies
const  jwt = require('jsonwebtoken') ;
require('dotenv').config()


const auth =  (req, res, next) => {
  try {

    if (req.headers.authorization) {
      const token = req.headers.authorization
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log(req.user)
        next();
      } catch (err) {
        res.status(403).send({
          error: true,
          statusCode: 403,
          message: 'Invalid Authorization token!',
        });
      }
    } else {
      res.status(401).send({
        error: true,
        statusCode: 401,
        message: 'Required Authorization token!',
      });
    }
  } catch (e) {
    res.status(401).send({
      error: true,
      statusCode: 401,
      message: 'Required Authorization token!',
    });
  }
};

module.exports = auth