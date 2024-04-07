import express from "express";
import { research, chatBot, similarRecipes, accompaniements } from "../controllers/aiController.js";

const router = express.Router();

router.post("/research", research);

router.post("/chatBot", chatBot);

router.post("/similarRecipes", similarRecipes);

router.post("/accompaniements", accompaniements);



export default router;
