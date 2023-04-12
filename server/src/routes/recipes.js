import { useRadioGroup } from "@mui/material";
import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

// Getting all the existing recipes
router.get("/", async (req, res) => {
    try {
        // Find all the recipes inside the database, Also you can put condition inside the object to specific items
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

// Creating a new recipe and saving it to the database
router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

// Saving the recipes
router.put("/", verifyToken, async (req, res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    try {
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Getting all the id of saved recipes by the user
router.get("/savedRecipes/ids/:userID", verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.status(201).json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Getting just the saved recipes
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        //  Query saved recipes with the user id
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

export { router as recipesRouter };
