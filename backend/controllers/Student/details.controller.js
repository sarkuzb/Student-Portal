const studentDetails = require("../../models/Students/details.model.js");

const getDetails = async (req, res) => {
  try {
    let user = await studentDetails.find(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No Student Found" });
    }
    const data = {
      success: true,
      message: "Student Details Found!",
      user,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const addDetails = async (req, res) => {
  try {
    let user = await studentDetails.findOne({
      enrollmentNo: req.body.enrollmentNo,
    });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Student With This Enrollment Already Exists",
      });
    }

    const profilePicture = req.file ? req.file.filename : null;

    user = await studentDetails.create({
      ...req.body,
      profile: profilePicture,
    });

    const data = {
      success: true,
      message: "Student Details Added!",
      user,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateDetails = async (req, res) => {
  try {
    let user;
    if (req.file) {
      user = await studentDetails.findByIdAndUpdate(req.params.id, {
        ...req.body,
        profile: req.file.filename,
      });
    } else {
      user = await studentDetails.findByIdAndUpdate(req.params.id, req.body);
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Student Found",
      });
    }

    const data = {
      success: true,
      message: "Updated Successfully!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteDetails = async (req, res) => {
  try {
    let user = await studentDetails.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No Student Found",
      });
    }
    const data = {
      success: true,
      message: "Deleted Successfully!",
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCount = async (req, res) => {
  try {
    let user = await studentDetails.countDocuments(req.body);
    const data = {
      success: true,
      message: "Count Successfully Retrieved!",
      user,
    };
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

module.exports = {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getCount,
};
