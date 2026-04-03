import mongoose from "mongoose";

const recruiterDetailSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // link to the recruiter (User model)
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  aboutCompany: {
    type: String,
    default: "",
  },
  companyWebsite: {
    type: String,
    default: "",
  },
  contactEmail: {
    type: String,
    required: true,
  },
  postedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // if you link jobs later
    },
  ],
}, { timestamps: true });

export default mongoose.model("RecruiterDetail", recruiterDetailSchema);
