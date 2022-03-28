const Category = require("../models/Category.model");
const decoded = require('../middleware/auth')


// Create and Save a new category
exports.create = async (req, res) => {
   data = new Category({
    // postid:req.body.postid,
    name: req.body.name,
    userid: req.user.id
  })

  try {
    const savedCat = await data.save();
    res.status(200).json({
      error: false,
      statusCode: 200,
      data: savedCat,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error,

    });
  }
};

//get all record of category
exports.findAll = async (req, res) => {
  try {
    const categorie = await Category.find();
    res.status(200).json({
      error: false,
      statusCode: 200,
      data: categorie,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error,
    });
  }
};

// Update a  category identified by the categoryId in the request
exports.update = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (cat.username === req.body.username) {
      try {
        const updatedcat = await Category.findByIdAndUpdate(req.params.id, {
          $set: req.body
        }, { new: true });
        res.status(200).json({
          error: false,
          statusCode: 200,
          data: updatedcat,
        })
      } catch (error) {
        res.status(500).json({
          error: true,
          statusCode: 500,
          data: error,
        })
        //   console.log(error)
      }
    } else {
      res.status(401).json({
        error: true,
        statusCode: 401,
        data: 'you can update only your categories',
      })
    }

  } catch (error) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error,
    })
    //   console.log(error)
  }
};
// Find a single category with a categoryid
exports.findOne = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    res.status(200).json({
      error: false,
      statusCode: 200,
      data: cat,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error
    });
  }
   
};
// Delete a category 
exports.delete = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (cat.username === req.body.username) {
      try {
        await cat.delete();
        res.status(200).json({
          error: false,
          statusCode: 200,
          msg: "category has been deleted..."
        });
      } catch (error) {
        res.status(500).json({
          error: true,
          statusCode: 500,
          data: error
        });
        // console.log(error)
      }
    } else {
      res.status(401).json({
        error: true,
        statusCode: 401,
        msg: "you can delete only your categories"
      })
    }

  } catch (error) {
    res.status(500).json({
      error: true,
      statusCode: 500,
      data: error,
      msg: "this categories is not in the database"
    })
  }
};