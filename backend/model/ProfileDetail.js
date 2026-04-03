import mongoose from "mongoose";

const detailsSchema = new mongoose.Schema({
  phone: {
    type: String,
  
  },
  location: {
    type: String,
  
  },
  Disability: {
    type: String,
  },
  bio: {
    type: String,

  },
  Institution: {
    type: String,
    
  },
  Degree: {
    type: String,
    
  },
  date: {
    type: String,
   
  },
  Company: {
    type: String,
    
  },
  Position: {
    type: String,
    
  },
  start: {
    type: String,
    
  },
  SkillName: {
    type: String,
    
  },
  Proficiency: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
   
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    
  },
});

export const Details = mongoose.model("Details", detailsSchema);
