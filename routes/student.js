const express = require("express");
const  router = express.Router();

const {
  createStudent,
  getStudents, 
  getStudentById,
  deleteStudent,
  CoursePhotoUpload,
  } = require("../controllers/student");

  const { protect } = require("../middleware/auth");

  router
  .route("/")
  .get(protect,getStudents)
  .post(protect,createStudent);

  router
  .route("/:id/image")
  .put(protect, CoursePhotoUpload);

  router
  .route("/:id")
  .get(protect,getStudentById)
  .delete(protect, deleteStudent);


  module.exports = router