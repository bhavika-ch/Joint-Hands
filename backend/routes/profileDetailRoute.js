import express from "express"
import { createProfile, getProfileByUser, updateProfile } from "../controller/ProfileDetail.js"

const profileSettingRouter = express.Router()

profileSettingRouter.post("/prof",createProfile)

profileSettingRouter.put("/profile/:id", updateProfile)

profileSettingRouter.get("/profile/user/:userId", getProfileByUser);

export default profileSettingRouter