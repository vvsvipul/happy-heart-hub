const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const recordsController = require("../controllers/records.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

router.get("/",recordsController.index)
//New Route
router.get("/new", isLoggedIn, recordsController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(recordsController.showRecord));

//Create Route
router.post("/",isLoggedIn,wrapAsync(recordsController.createRecord));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(recordsController.renderEditForm)
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(recordsController.updateRecord)
);

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, recordsController.deleteRecord);

module.exports = router;
