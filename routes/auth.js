const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



//frist user going to register
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json({
            error: false,
            statusCode: 200,
            data: user,

        });
    } catch (error) {

        res.status(500).json({
            error: true,
            statusCode: 500,
            data: error,
            msg: "email is alerdy register"
        })
        console.log(error)
    }
});

//second user can login
router.post('/login',  async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })    
        const validated = await bcrypt.compare(req.body.password, user.password)
        // const token = jwt.sign({ userID: user._id }, 'process.env.JWT_SECRET_KEY', { expiresIn: '45m' })
            if (validated) {
                const { password, ...others } = user._doc;
                res.status(200).json({
                    error: false,
                    statusCode: 200,
                    data: others,
                    token:generateToken(user._id)
                })
            } else {
                res.status(400).json({
                    error: true,
                    statusCode: 400,
                    data: "login information is not matching",
                })
            }       
    } catch (error) {
        res.status(500).json({
            error: true,
            statusCode: 500,
            data: "server error",
        })
        // console.log(error)
    }
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

module.exports = router