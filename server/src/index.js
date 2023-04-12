// Nodemon helps refresh the server without exiting the server

// Express will be serve as a framework to create our API
import express from "express";

// Cors is a library the allows to setup the rules between the comminication between front end and backend
import cors from "cors";

// Mongoose is MongoDB is a database management system, will allow us to write queries and communicate to our database
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

// We are parsing the data from the front end
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
    "mongodb+srv://stevedelarosa:MERN2023@recipes.yosjecs.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(3001, () => {
    console.log("Server Started");
});
