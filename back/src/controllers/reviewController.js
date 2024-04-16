import Review from "../models/review.js";
import Recipe from "../models/recipe.js";

const createReview = async (req, res) => {
    try {
        const {userId, recipeId, comment, rating} = req.body;

        const newReview = new Review({user: userId, recipe: recipeId, comment, rating});
        await newReview.save();
        await Recipe.findByIdAndUpdate(recipeId, {$push: {reviews: newReview._id}});

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({message: "Review not found"});
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateReview = async (req, res) => {
    try {
        const {user, recipe, comment, rating} = req.body;
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, {
            user, recipe, comment, rating
        }, {new: true});
        if (!updatedReview) {
            return res.status(404).json({message: "Review not found"});
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({message: "Review not found"});
        }
        res.status(200).json({message: "Review deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {createReview, getReviews, getReviewById, updateReview, deleteReview};
