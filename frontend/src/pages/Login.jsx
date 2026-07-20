import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.data.token
            );

            navigate("/dashboard");

        } catch (error) {

            console.error("Login failed:", error);

            setError(
                "Invalid email or password. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-page">

            <div className="auth-background">

                <div className="auth-circle circle-one"></div>
                <div className="auth-circle circle-two"></div>

            </div>


            <div className="auth-container">


                {/* LEFT SIDE */}

                <div className="auth-brand-section">

                    <div className="auth-brand">

                        <div className="auth-logo">
                            ₹
                        </div>

                        <h1>
                            FinTrack
                        </h1>

                    </div>


                    <h2>
                        Take control of your
                        <span> financial future.</span>
                    </h2>


                    <p>
                        Track your income, monitor expenses,
                        understand your spending and manage
                        your finances from one simple dashboard.
                    </p>


                    <div className="auth-features">

                        <div className="auth-feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Track Transactions
                                </strong>

                                <span>
                                    Manage all your income
                                    and expenses
                                </span>
                            </div>

                        </div>


                        <div className="auth-feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Financial Insights
                                </strong>

                                <span>
                                    Understand where your
                                    money goes
                                </span>
                            </div>

                        </div>


                        <div className="auth-feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Secure Access
                                </strong>

                                <span>
                                    Your account is protected
                                    with authentication
                                </span>
                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="auth-form-section">

                    <div className="auth-card">

                        <div className="auth-card-header">

                            <div className="mobile-logo">
                                ₹
                            </div>

                            <h2>
                                Welcome Back
                            </h2>

                            <p>
                                Sign in to continue to your
                                financial dashboard.
                            </p>

                        </div>


                        {error && (

                            <div className="auth-error">

                                {error}

                            </div>

                        )}


                        <form onSubmit={login}>

                            <div className="auth-form-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                            </div>


                            <div className="auth-form-group">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                            </div>


                            <button
                                type="submit"
                                className="auth-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Signing In..."
                                    : "Sign In"
                                }

                            </button>

                        </form>


                        <div className="auth-divider">

                            <span>
                                New to FinTrack?
                            </span>

                        </div>


                        <Link
                            to="/register"
                            className="auth-secondary-button"
                        >
                            Create New Account
                        </Link>


                        <p className="auth-footer">

                            Manage your money.
                            Build your future.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;