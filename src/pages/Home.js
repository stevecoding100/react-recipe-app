import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";
const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/recipes"
                );
                // Should return the list of recipes
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        //Getting the saved recipes from data
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
                );
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipes();
        if (cookies.access_token) fetchSavedRecipes();
    }, []);

    // Function to save recipes
    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put(
                "http://localhost:3001/recipes",
                {
                    recipeID,
                    userID,
                },
                // Providen the verified token to be able to save recipes
                { headers: { Authorization: cookies.access_token } }
            );
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    // To check if user already saved a recipe
    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>
                        {savedRecipes.includes(recipe._id) && (
                            <h1>Already Saved</h1>
                        )}
                        <div>
                            <h2>{recipe.name}</h2>
                            <button
                                onClick={() => saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
                            >
                                {/* If user already saved the recipes switch the button text */}
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>
                        </div>
                        <div className="instructions">
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Home;
