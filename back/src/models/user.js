import mongoose from "mongoose";
import Recipe from "./recipe.js";

const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        favorites: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Recipe",
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;