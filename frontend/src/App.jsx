import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Training from "./pages/Training";
import VoiceControl from "./pages/VoiceControl";
import AIChatbot from "./pages/AIChatbot";
import Community from "./pages/Community";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import ResumeBuilder from "./pages/ResumeBuilder";
import ProfileSettings from "./pages/ProfileSetting";
import Interview from "./pages/Interview";
import GovernmentSchemes from "./pages/GoveremntSchema";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";

import Coursesc1 from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CourseLearn from "./components/CourseLearn";
import Mentor from "./pages/Mentor";

const App = () => {
  return (
    <div>
      <Navbar />

      <VoiceControl />

      <AIChatbot />

      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/training" element={<Training />} />

        <Route path="/community" element={<Community />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />

        <Route path="/interview" element={<Interview />} />

        <Route path="/govt-schemes" element={<GovernmentSchemes />} />

        <Route path="/job/:id" element={<JobDetails />} />

        <Route path="/apply/:id" element={<ApplyJob />} />

        <Route path="/courses" element={<Coursesc1 />} />

        <Route path="/course/:id" element={<CourseDetail />} />

        <Route path="/course/:id/learn" element={<CourseLearn />} />

        <Route path="/mentor" element={<Mentor />}/>
      </Routes>
    </div>
  );
};

export default App;
