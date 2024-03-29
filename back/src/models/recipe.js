import mongoose from "mongoose";
import Review from "./reveiw.js";

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
});

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: {
            type: [ingredientSchema],
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        avgRating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: [Review.schema],
            required: false
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            ref: "Category",
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;