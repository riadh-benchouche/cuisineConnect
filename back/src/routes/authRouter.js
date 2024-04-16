import express from "express";
import {register, login, logout, getFavorites, addFavorite} from "../controllers/authController.js"

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get('/getFavorites', getFavorites);

router.post('/addFavorite', addFavorite);


export default router