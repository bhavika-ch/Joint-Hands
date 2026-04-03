import { Details } from "../model/ProfileDetail.js";

// ✅ CREATE PROFILE
export const createProfile = async (req, res) => {
  try {
    const {
      phone,
      location,
      Disability,
      bio,
      Institution,
      Degree,
      date,
      Company,
      Position,
      start,
      SkillName,
      Proficiency,
    } = req.body;

    if (
      !phone &&
      !location &&
      !bio &&
      !Institution &&
      !Degree &&
      !date &&
      !Company &&
      !Position &&
      !start &&
      !SkillName &&
      !Proficiency
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field must be provided",
      });
    }

    const profile = await Details.create({
      phone,
      location,
      Disability,
      bio,
      Institution,
      Degree,
      date,
      Company,
      Position,
      start,
      SkillName,
      Proficiency,
      userId: req.user?._id || "670bfbf01c2c1c1f22b12345", // temp ID if auth not added
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.error("Create Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params; // get profile id from URL

    const updatedProfile = await Details.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET PROFILE BY USER ID
// ✅ GET PROFILE BY USER ID or PROFILE ID
export const getProfileByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Try to find either by userId or by _id
    const profile = await Details.findOne({
      $or: [{ userId }, { _id: userId }],
    });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
