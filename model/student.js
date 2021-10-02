const mongoose = require("mongoose");

const Student = new mongoose.Schema(
    {
        courseTitle:{
            type: String,
        },
        courseType:{
            type: String,
        },
        coursePrice:{
            type: String,
        },
        courseAuthor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        coursePic: {
            type: String,
            default: "no-photo.jpg",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
);

module.exports = mongoose.model("Student",Student);
