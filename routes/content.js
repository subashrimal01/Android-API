const express = require("express");
const  router = express.Router();

const {
  createContent, getContent
  } = require("../controllers/content");

  const { protect } = require("../middleware/auth");

  router
  .route("/content")
  .post(protect,createContent)

  router
  .route("/content/:id")
  .get(protect,getContent)

  module.exports = router