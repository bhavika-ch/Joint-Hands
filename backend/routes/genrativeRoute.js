import express from "express"
import { generateAISuggestions } from "../controller/GenerativeAi.js"

const GenerativeRouter = express.Router()


GenerativeRouter.post("/gen",generateAISuggestions)


export default GenerativeRouter