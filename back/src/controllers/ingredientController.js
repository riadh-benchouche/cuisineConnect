import Ingredient from "../models/ingredient.js";

const createIngredient = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const newIngredient = new Ingredient({ name, quantity });
        await newIngredient.save();
        res.status(201).json(newIngredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getIngredientById = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        res.status(200).json(ingredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateIngredient = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, { name, quantity }, { new: true });
        if (!updatedIngredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        res.status(200).json(updatedIngredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteIngredient = async (req, res) => {
    try {
        const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (!deletedIngredient) {
            return res.status(404).json({ message: "Ingredient not found" });
        }
        res.status(200).json({ message: "Ingredient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createIngredient, getIngredients, getIngredientById, updateIngredient, deleteIngredient };
