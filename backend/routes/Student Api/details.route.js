const express = require("express");
const router = express.Router();
const {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getCount,
} = require("../../controllers/Student/details.controller.js");
const upload = require("../../middlewares/multer.middleware.js");

// No changes needed in the routes! Only ensure multer is attached here, not controller
router.post("/getDetails", getDetails);

router.post("/addDetails", upload.single("profile"), addDetails);

router.put("/updateDetails/:id", upload.single("profile"), updateDetails);

router.delete("/deleteDetails/:id", deleteDetails);

router.get("/count", getCount);

module.exports = router;
