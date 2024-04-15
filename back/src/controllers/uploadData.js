import fs from 'fs';
import Recipe from "../models/recipe.js";
import Ingredient from "../models/ingredient.js";
import Category from "../models/category.js";

const uploadData = async (req, res) => {
    try {
        const data = fs.readFileSync('/Users/prom3/Desktop/openai-project/cuisineConnect/back/src/data.json');
        const recipes = JSON.parse(data);
        recipes.map(async recipe => {
            const {name, ingredients, description, duration, imageURL, difficulty, category, steps} = recipe;
            const newIngredients = [];
            ingredients.map(async ingredient => {
                const {name, quantity,} = ingredient;
                const newIngredient = new Ingredient({name, quantity});
                await newIngredient.save();
                newIngredients.push(newIngredient);
            });
            const newCategory = new Category({name: category});
            await newCategory.save();
            const newRecipe = new Recipe({
                name,
                ingredients: newIngredients,
                description,
                duration,
                steps,
                image: imageURL,
                difficulty,
                category: newCategory,
            });
            await newRecipe.save();
        });
        res.status(200).json({message: "Data uploaded"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export default uploadData;