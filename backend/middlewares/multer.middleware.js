const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'media' folder exists
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./media";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let filename = "";

    if (req.body?.type === "timetable") {
      filename = `Timetable_${req.body.semester}_Semester_${req.body.branch}.png`;
    } else if (req.body?.type === "profile") {
      if (req.body.enrollmentNo) {
        filename = `Student_Profile_${req.body.enrollmentNo}_Semester_${req.body.branch}.png`;
      } else {
        filename = `Faculty_Profile_${req.body.employeeId}.png`;
      }
    } else if (req.body?.type === "material") {
      filename = `${req.body.title}_Subject_${req.body.subject}.pdf`;
    }

    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only PNG, JPEG, and PDF are allowed.")
      );
    }
    cb(null, true);
  },
});

module.exports = upload;
