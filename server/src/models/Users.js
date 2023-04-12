import mongoose from "mongoose";

// Schema is an object that defines the structure of our data
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

export const UserModel = mongoose.model("users", userSchema);
