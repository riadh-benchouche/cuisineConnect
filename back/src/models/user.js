import mongoose from "mongoose";

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

export default mongoose.model("User", userSchema);