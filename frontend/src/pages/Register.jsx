import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const register = async (e) => {

        e.preventDefault();

        if (!name || !email || !password) {

            setError(
                "Please fill in all the required fields."
            );

            return;
        }

        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }

        try {

            setLoading(true);
            setError("");

            await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(
                "Registration Successful! Please login."
            );

            navigate("/");

        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-page">

            <div className="auth-background">

                <div className="auth-circle circle-one">
                </div>

                <div className="auth-circle circle-two">
                </div>

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

                        Start building a better

                        <span>
                            {" "}financial future.
                        </span>

                    </h2>


                    <p>

                        Create your free account and start
                        tracking your income, expenses and
                        financial activity from one simple
                        dashboard.

                    </p>


                    <div className="auth-features">


                        <div className="auth-feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    Simple Expense Tracking
                                </strong>

                                <span>
                                    Record and categorize
                                    your daily expenses
                                </span>

                            </div>

                        </div>


                        <div className="auth-feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    Financial Overview
                                </strong>

                                <span>
                                    View your income,
                                    expenses and balance
                                </span>

                            </div>

                        </div>


                        <div className="auth-feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>

                                <strong>
                                    Secure Account
                                </strong>

                                <span>
                                    Your financial data
                                    stays linked to your
                                    personal account
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
                                Create Account
                            </h2>

                            <p>
                                Join FinTrack and start
                                managing your finances today.
                            </p>

                        </div>


                        {error && (

                            <div className="auth-error">

                                {error}

                            </div>

                        )}


                        <form onSubmit={register}>


                            <div className="auth-form-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="auth-form-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="auth-form-group">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <button
                                type="submit"
                                className="auth-button"
                                disabled={loading}
                            >

                                {
                                    loading
                                        ? "Creating Account..."
                                        : "Create Account"
                                }

                            </button>

                        </form>


                        <div className="auth-divider">

                            <span>
                                Already have an account?
                            </span>

                        </div>


                        <Link
                            to="/"
                            className="auth-secondary-button"
                        >

                            Back to Login

                        </Link>


                        <p className="auth-footer">

                            Take control of your money.
                            One transaction at a time.

                        </p>


                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;