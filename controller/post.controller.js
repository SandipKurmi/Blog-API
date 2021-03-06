const Post = require('../models/Post.model');
const Category = require('../models/Category.model')


// Create and Save a new post
exports.create = async (req, res) => {
  // const newPost = new Post(req.body)
  data = new Post({
    categoryid:req.body.categoryid,
    title:req.body.title,
    name: req.body.name,
    userid: req.user.id,
    desc:req.body.desc,
  })
  try {
    const savePost1 = await data.save();
    res.status(200).json({
      error: false,
      statusCode: 200,
      data: savePost1,
    })
  } catch (error) {
    console.log(error )
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error,

    })
    
  }
};
//get all record of post
exports.findAll = async (req, res) => {
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
      msg: "query is not correct"

    });
  }
};

// Update a  post identified by the postid in the request
exports.update = async (req, res) => {
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
};
// Find a single post with a postid
exports.findOne = async (req, res) => {
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
};
// Delete a post 
exports.delete = async (req, res) => {
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
};


exports.postfilter = async (req, res) => {
  let blogs = await Post.find({ userid: user, categoryid:category })
 
};


