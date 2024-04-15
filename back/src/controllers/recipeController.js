import Recipe from "../models/recipe.js";
import mongoose from "mongoose";

const createRecipe = async (req, res) => {
    try {
        const { name, ingredients, description, duration, image, difficulty, category } = req.body;

        const { ObjectId } = mongoose.Types;

        // Convertir les IDs des ingrédients en ObjectId
        const ingredientIDs = ingredients.map(ingredientID => new ObjectId(ingredientID));

        // Créer la recette avec les IDs des ingrédients
        const newRecipe = new Recipe({
            name,
            ingredients: ingredientIDs,
            description,
            duration,
            image,
            difficulty,
            category
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("ingredients", ["name", "quantity"]).populate("category", ["name"]).populate("reviews", ["rating", "comment"]).exec();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateRecipe = async (req, res) => {
    try {
        const {
            name,
            ingredients,
            description,
            duration,
            image,
            difficulty,
            category,
            reviews
        } = req.body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                name,
                ingredients,
                description,
                duration,
                image,
                difficulty,
                category,
                reviews
            },
            { new: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };
