import express from "express";
import { createReview, getReviews, getReviewById, updateReview, deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);

router.get("/", getReviews);

router.get("/:id", getReviewById);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

export default router;
