const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    categoryid:{
      type:String,
      required: true
    },
    userid:{
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);