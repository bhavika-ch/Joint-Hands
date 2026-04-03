import express from "express"
import { profile } from "../controller/Profile.controller.js"

const profileRouter = express.Router()

profileRouter.post("/resume",profile)

export default profileRouter