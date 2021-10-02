const express = require("express");
const  router = express.Router();

const {
  createWishlist, getWishlist, deleteWishlist
  } = require("../controllers/wishlist");

  const { protect } = require("../middleware/auth");

  router
  .route("/wishlist")
  .post(protect,createWishlist)

  router
  .route("/wishlist")
  .get(protect,getWishlist)

  router
  .route("/wishlist/delete/:id")
  .delete(protect,deleteWishlist)

  module.exports = router