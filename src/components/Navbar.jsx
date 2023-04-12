import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

// To help us redirect the user to another page
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-recipe">Create Recipe</Link>

            {/* Ternary condition -- if user is login and has a verified access token display logout button else login/register */}
            {!cookies.access_token ? (
                <Link to="/auth">Login/Register</Link>
            ) : (
                <>
                    <Link to="/saved-recipe">Saved Recipes</Link>
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </div>
    );
};

export default Navbar;
