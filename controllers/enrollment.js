const asyncHandler = require("../middleware/async");
const Enroll = require("../model/enrollment");

exports.createEnroll = asyncHandler(async (req, res, next) => {

    const userid = req.user.id;
   const course_id =  req.body.course_id;
   const courseTitle = req.body.courseTitle;
   const coursePrice = req.body.coursePrice;

  const student = await Enroll.create({user:userid,course_id:course_id,courseTitle: courseTitle, coursePrice: coursePrice});

  res.status(201).json({
    success: true,
    data: student,
  });
});


exports.getEnroll = asyncHandler(async (req, res, next) => {
  
    const userid = req.user.id;
  const enrollment = await Enroll.find({user:userid});
  

  res.status(201).json({
    success: true,
    count: enrollment.length,
    data: enrollment,
  });
});

exports.deleteEnroll = asyncHandler(async (req, res, next) => {
  const course = await Enroll.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse(`No student found `), 404);
  }

  await course.remove();

  res.status(200).json({    
    success: true,
    count: course.length,
    data: {},
  });
});