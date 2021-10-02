const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");
const crypto = require("crypto");
const express = require("express");
const  router = express.Router();
const upload = require("../fileupload");

//--------------------------REGISTER USER-----------------

exports.register = asyncHandler(async (req, res, next) => {
  const { username,email,password } = req.body;

  const user = await User.create({
   username,
   email,
   password,
  })
  sendTokenResponse(user, 200, res);

});

//-------------------LOGIN-------------------

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorResponse("Please provide username and password"), 400);
  }

  // Check user
  const user = await User.findOne({ username: username }).select("+password");
  //because in password field we have set the property select:false , but here we need as password so we added + sign

  if (!user) {
    res
    .status(201)
    .json({
      success: false,
      message: 'Invalid credentails user',
    });  
  }

  // const isMatch = await user.matchPassword(password); // decrypt password
  
  if (user.password!= password) {
    res
    .status(201)
    .json({
      success: false,
      message: 'Invalid credentails',
    });
  }
 else{
  sendTokenResponse(user, 200, res);
}
});

//------------------LOGOUT--------------
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: "User Logged out",
  });
});


exports.uploadUserImage = (req,res)=>{
  
}

exports.updateProfile = asyncHandler(async (req,res,next) =>{ 
  const id = req.body._id;
  const { firstname,lastname,username,email } = req.body;
  const user = await User.findByIdAndUpdate({_id : id},{
   firstname: firstname,
   lastname: lastname,
   username: username,
   email: email,
  });
 
  sendTokenResponse(user, 200, res);
});

//-------------------------CURRENT USER DETAILS-----------

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

router.put("/updateimage/:id",upload.single("image"),function (req, res) {
  console.log(req.file.filename)
  const usrId= req.params.id
  if(req.file == undefined) return res.status(400).json({message: "jpeg and png images are only allowed"}); 
  User.updateOne({_id:usrId},{ profilePic : req.file.filename}).then(function(){
      res.status(200).json({success:true, message :"Profile picture successfully added"})
   }).catch(function(error){
      res.status(201).json({message :"User not found"})
      })
    
  }
);

// Get token from model , create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
 
  const token = user.getSignedJwtToken();

  const options = {
    //Cookie will expire in 30 days
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Cookie security is false .if you want https then use this code. do not use in development time
  if (process.env.NODE_ENV === "proc") {
    options.secure = true;
  }

  //we have created a cookie with a token
  res
    .status(statusCode)
    .cookie("token", token, options) // key , value ,options
    .json({
      success: true,
      token,
    });

};



exports.UserPhotoUpload = asyncHandler(async (req, res, next) => {
  const student = await User.findById(req.params.id);

  console.log(student);
  if (!student) {
    return next(new ErrorResponse(`No student found with ${req.params.id}`), 404);
  }


  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo and accept any extension of an image
  // if (!file.mimetype.startsWith("image")) {
  //   return next(new ErrorResponse(`Please upload an image`, 400));
  // }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `photo_${student.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      //console.err(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    //insert the filename into database
    await User.findByIdAndUpdate(req.params.id, {
      profilePic: file.name,
    });
  });

  res.status(200).json({
    success: true,
    data: file.name,
  });
});
