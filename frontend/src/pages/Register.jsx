import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {

        await api.post("/auth/register", {
            name,
            email,
            password
        });

        alert("Registration Successful");

        navigate("/");

    };

    return (

        <div>

            <h1>Create Account</h1>

            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <br /><br />

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={register}>
                Register
            </button>

            <br /><br />

            <Link to="/">
                Back to Login
            </Link>

        </div>

    );

}

export default Register;