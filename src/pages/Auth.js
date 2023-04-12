import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
};

export default Auth;

const Login = () => {
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [_, setCookies] = useCookies(["access_token"]);

    // This allow you to send user to another page
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/auth/login",
                {
                    username,
                    password,
                }
            );

            setCookies("access_token", response.data.token);
            // Setting the UserID inside the locastorage
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
            // This can be used to redirect the user to another page after login
            // window.location.pathname = "/";

            alert("Logged In!");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
        />
    );
};

const Register = () => {
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password,
            });
            alert("Registration Completed!, Login Now");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={onSubmit}
        />
    );
};

const Form = ({
    username,
    setUsername,
    password,
    setPassword,
    label,
    onSubmit,
}) => {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">{label}</button>
            </form>
        </div>
    );
};
