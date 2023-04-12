import "./App.css";

// Allows us to navigate to different pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing the pages from the pages folder
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipe from "./pages/SavedRecipe";

// Importing  the components from the components folder
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    {/* This are the different routes we can navigate to. */}
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/create-recipe" element={<CreateRecipe />} />
                    <Route path="/saved-recipe" element={<SavedRecipe />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
