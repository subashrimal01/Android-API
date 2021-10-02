const asyncHandler = require("../middleware/async");
const wishlist = require("../model/wishlist");
const Student = require("../model/student");

exports.createWishlist = asyncHandler(async (req, res, next) => {

   const course_id =  req.body.course_id;
   const courseTitle = req.body.courseTitle;
   const coursePrice = req.body.coursePrice;

  const student = await wishlist.create({course_id:course_id,courseTitle: courseTitle, coursePrice: coursePrice});

  res.status(201).json({
    success: true,
    data: student,
  });
});


exports.getWishlist = asyncHandler(async (req, res, next) => {
  
  const wishlists = await wishlist.find({});
  

  res.status(201).json({
    success: true,
    count: wishlists.length,
    data: wishlists,
  });
});

exports.deleteWishlist = asyncHandler(async (req, res, next) => {
  const course = await wishlist.findById(req.params.id);

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