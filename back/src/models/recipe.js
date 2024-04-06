import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        ingredients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true,
        }],
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
            required: false,
        }],
        image: {
            type: String,
            required: true,
        },  
        difficulty: {
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

export default mongoose.model("Recipe", recipeSchema);