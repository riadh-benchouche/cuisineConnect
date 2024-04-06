import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) return res.sendStatus(409);

        const hashedPassword = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(64).toString("hex");

        const user = await User.create({name, email, password: hashedPassword, token});

        res.status(200).json({user: {_id: user._id, name: user.name, email: user.email}});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.sendStatus(404);

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.sendStatus(401);

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});
        res.cookie(process.env.JWT_NAME, token, {httpOnly: true});
        res.status(200).json({user: {_id: user._id, name: user.name, email: user.email}});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const logout = (req, res) => {
    try {
        const token = req.cookies[process.env.JWT_NAME];
        if (!token) return res.sendStatus(401);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(401);
            res.clearCookie(process.env.JWT_NAME);
            res.sendStatus(204);
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {register, login, logout};
