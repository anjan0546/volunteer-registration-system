const express = require("express");
const router = express.Router();

const Volunteer = require("../models/Volunteer");

// Register Volunteer
router.post("/register", async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();

    res.status(201).json({
      success: true,
      message: "Volunteer Registered Successfully",
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Volunteers
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find();

    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {

    await Volunteer.findByIdAndDelete(req.params.id);

    res.json({
        message: "Volunteer Deleted"
    });

});

router.put("/approve/:id", async (req, res) => {

    const volunteer = await Volunteer.findByIdAndUpdate(
        req.params.id,
        { status: "Approved" },
        { new: true }
    );

    res.json(volunteer);

});



module.exports = router;