import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // making request to mongoDB to see if user exits
    const user = await UserModel.findOne({ username });

    // Conditional statement to check if user already exist inside the Database, If user exist then will be prompted to use another username or reset password
    if (user) {
        return res.json({ message: "User already exist!" });
    }

    // Hashing password to protect user data from hacker and malicious people
    const hashedPassword = await bcrypt.hash(password, 10);

    // Adding new user to database
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Registered Successfully!" });
});

// Creating the login end point
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Checking the database to check the typed username
    const user = await UserModel.findOne({ username });

    // If we can't find user server will throw message
    if (!user) {
        return res.status(400).json({ message: "User doesn't exist!" });
    }
    // Comparing the user password they type with the password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password don't match our database then return the error message
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ message: "Username or Password is incorrect!" });
    }

    // Assigning a token to each user that sign in into our application. It enables users to verify their identity to websites, which then generates a unique encrypted authentication token.

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
});

export { router as userRouter };

// Creating a middleware to verify if the token sent from the front end match the back end to verify user
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, "secret", (err) => {
            if (err) {
                // 403 - user not authrorized, Forbidden status code
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        // indicates that the client request has not been completed because it lacks valid authentication credentials
        res.sendStatus(401);
    }
};
