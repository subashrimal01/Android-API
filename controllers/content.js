const asyncHandler = require("../middleware/async");
const content = require("../model/content");
const Student = require("../model/student");

exports.createContent = asyncHandler(async (req, res, next) => {

   const title = req.body.title;
   const time = req.body.time;
   const course_id =  req.body.course_id;

  const course = await content.create({course_id:course_id,title: title, time: time});

  res.status(201).json({
    success: true,
    data: course
  });
});


exports.getContent = asyncHandler(async (req, res, next) => {
  
    const course = await content.find({course_id:req.params.id});

  res.status(201).json({
    success: true,
    count: course.length,
    data: course
  });
});