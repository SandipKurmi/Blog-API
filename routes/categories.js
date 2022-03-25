const router = require("express").Router();
const Category = require("../models/Category");
const protect = require('../middleware/authMiddelwear')
require('dotenv').config()
// eslint-disable-next-line import/no-extraneous-dependencies
const  jwt = require('jsonwebtoken') ;
//post category
// router.post("/" , async (req, res)=> {
//     const newCat = new Category(req.body);
//     try {
//         const savedCat = await newCat.save();
//         res.status(200).json({
//             error: false,
//             statusCode: 200,
//             data: savedCat,
//         });
//     } catch (error) {
//         res.status(500).json({
//             error: true,
//             statusCode: 500,
//             // data: error,
//         });
//         console.log(error)
// }
// })

// router.post("/", async (req, res) => {
//     const newCat = new Category(req.body);
//     try {
//       const savedCat = await newCat.save();
//       res.status(200).json({
//         error: false,
//         statusCode: 200,
//         data: savedCat,
        
//       });
//     } catch (error) {
//       res.status(500).json({
//         error: true,
//         statusCode: 500,
//         data: error,
//       });
//     }
//   });
router.post("/", async (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      var data = new Category({
        name: req.body.name,
        userid: req.user.id
    });
    await data.save()
    try {
      res.status(200).json({
        error: false,
        statusCode: 200,
        data: data,
        
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        statusCode: 500,
        data: 'error',
      });
    }
  }
  
} );

//get categories
router.get('/',protect, async (req, res) => {
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
});


//update categories
router.put('/:id',protect, async (req, res) => {
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
  });
  
//delete categories
  router.delete('/:id',protect, async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (cat.username === req.body.username) {
      try {
        await cat.delete();
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
        // console.log(error)
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
      msg:"this categories is not in the database"
    })
  }
});



module.exports = router;