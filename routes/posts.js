const router = require('express').Router();
const User = require('../models/User')
const Post = require('../models/Post')
// const auth = require('../authtoken')
const protect = require('../middleware/authMiddelwear')


//create post
router.post('/',protect, async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savePost = await newPost.save();
    res.status(200).json({
      error: false,
      statusCode: 200,
      data: savePost,
    })

  } catch (error) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error,

    })
    // console.log(error)
  }
})


//update post
router.put('/:id',protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, { new: true });
        res.status(200).json({
          error: false,
          statusCode: 200,
          data: updatedPost,
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
        data: 'you can update only your post',
      })
    }

  } catch (error) {
    res.status(500).json(error)
  }
});


//delete our user

router.delete('/:id',protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json({
          error: false,
          statusCode: 200,
          msg: "Post has been deleted..."
        });
      } catch (error) {
        res.status(500).json({
          error: true,
          statusCode: 500,
          data: error
        });
      }
    } else {
      res.status(401).json({
        error: true,
        statusCode: 401,
        msg: "you can delete only your post"
      })
    }

  } catch (error) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error,
    })
  }
});



//get post
router.get("/:id",protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      error: false,
      statusCode: 200,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error
    });
  }
});

//get all posts

router.get("/",protect, async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json({
      error: false,
      statusCode: 200,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error,
      msg:"query is not correct"

    });
  }
});

module.exports = router