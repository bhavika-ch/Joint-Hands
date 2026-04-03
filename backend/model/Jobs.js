import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RecruiterDetail",
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salaryRange: {
    type: String,
    default: "Not disclosed",
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Remote"],
    default: "Full-time",
  },
  experienceLevel: {
    type: String,
    enum: ["Fresher", "Mid-level", "Senior"],
    default: "Fresher",
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [
    {
      type: String,
    },
  ],

  // ✅ NEW FIELD: Disability Support
  suitableForDisabilities: [
    {
      type: String,
      enum: [
        "Wheelchair users",
        "Hearing impairment",
        "Visual impairment",
        "Speech impairment",
        "Cognitive disability",
        "Other",
      ],
    },
  ],

  postedDate: {
    type: Date,
    default: Date.now,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open",
  },
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
