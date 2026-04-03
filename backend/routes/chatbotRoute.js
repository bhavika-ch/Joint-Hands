import express from "express";
import { chatWithAI } from "../controller/ChatbotController.js";

const ChatbotRouter = express.Router();

ChatbotRouter.post("/chat", chatWithAI);

export default ChatbotRouter;
