import Category from "../models/category.js";

const createCategory = async (req, res) => {
        try {
            const { name } = req.body;
            const newCategory = new Category({ name });
            await newCategory.save();
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

const getCategories = async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

const getCategoryById = async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

const updateCategory = async (req, res) => {
        try {
            const { name } = req.body;
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

const deleteCategory = async (req, res) => {
        try {
            const deletedCategory = await Category.findByIdAndDelete(req.params.id);
            if (!deletedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


export {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory};
