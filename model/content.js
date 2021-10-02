const mongoose = require("mongoose");

const Content = new mongoose.Schema(
    {
        title:{
            type: String
        },
        time:{
            type: String
        },
        course_id:{
            type: String
        }
    }
);

module.exports = mongoose.model("Content",Content);
