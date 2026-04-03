import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Student applying for the job
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", // The job being applied for
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Recruiter who posted the job
      required: true,
    },
    resumeUrl: {
      type: String, // Cloudinary link or uploaded file
      required: true,
    },
    coverLetter: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Applied", "Under Review", "Shortlisted", "Rejected", "Accepted"],
      default: "Applied",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    feedback: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
