
const mongoose = require("mongoose");

const Wishlist = new mongoose.Schema(
    {
        course_id:{
            type: String,
        },
        courseTitle:{
            type: String,
        },
        coursePrice:{
            type: String,
        },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
);

module.exports = mongoose.model("Wishlist",Wishlist);