import express from 'express'
import { generateInterviewQuestions, getInterviewFeedback } from '../controller/InterviewController.js'

const InterviewRouter = express.Router()

InterviewRouter.post("/interview/generate",generateInterviewQuestions)

InterviewRouter.post("/interview/feedback",getInterviewFeedback)


export default InterviewRouter