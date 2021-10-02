const express = require("express");
const  router = express.Router();

const {
  createEnroll, getEnroll, deleteEnroll
  } = require("../controllers/enrollment");

  const { protect } = require("../middleware/auth");

  router
  .route("/enrollment")
  .post(protect,createEnroll)

  router
  .route("/enrollment")
  .get(protect,getEnroll)

  router
  .route("/enrollment/delete/:id")
  .delete(protect,deleteEnroll)

  module.exports = router