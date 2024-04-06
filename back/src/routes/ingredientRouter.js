import express from "express";
import { createIngredient, getIngredients, getIngredientById, updateIngredient, deleteIngredient } from "../controllers/ingredientController.js";

const router = express.Router();

router.post("/", createIngredient);

router.get("/", getIngredients);

router.get("/:id", getIngredientById);

router.put("/:id", updateIngredient);

router.delete("/:id", deleteIngredient);

export default router;
