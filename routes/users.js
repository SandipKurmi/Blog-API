const router = require('express').Router();
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require("bcrypt");
const protect = require('../middleware/authMiddelwear')

//update our user
router.put('/:id',protect, async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json({
                error: false,
                statusCode: 200,
                data: updatedUser,
            })

        } catch (error) {
            res.status(500).json({
                error: true,
                statusCode: 500,
                data: error,
            })
            // console.log(error)
        }
    } else {
        res.status(401).json({
            error: true,
            statusCode: 401,
            msg: 'you can update only your account'
        })
    }
});

//delete our user

router.delete('/:id',protect, async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({
                error: false,
                statusCode: 200,
                data: "user has been deleted",
                })

            } catch (error) {
                res.status(500).json({
                    error: true,
                    statusCode: 500,
                    data: error,
                })
                // console.log(error)
            }
        } catch (error) {
            res.status(404).json({
                error: true,
                statusCode: 404,
                data: "user not found",
            })
        }

    } else {
        res.status(401).json({
            error: true,
            statusCode: 401,
            data: "you can only delete your account",
        })
    }
});

//get user our user

router.get("/:id",protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json({
            error: false,
            statusCode: 200,
            data: others,
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            statusCode: 500,
            data: error,
        });
    }
});

module.exports = router