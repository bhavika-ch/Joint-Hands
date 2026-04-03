import express from "express"
import { getCurrentUser, login, logout, register } from "../controller/userController.js"
import isAuthenticated from "../middleware/Auth.js";

const UserProfile = express.Router()

UserProfile.post("/register",register);
UserProfile.post("/login",login)
UserProfile.get("/logout",logout)
UserProfile.get("/current",isAuthenticated,getCurrentUser)

export default UserProfile