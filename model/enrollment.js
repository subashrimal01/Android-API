
const mongoose = require("mongoose");

const Enroll = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
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

module.exports = mongoose.model("Enroll",Enroll);