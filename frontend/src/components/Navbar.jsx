function Navbar() {

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";

    };

    const getUserInitial = () => {

        const token = localStorage.getItem("token");

        if (!token) return "U";

        try {
            const payload = token.split(".")[1];
            const decoded = JSON.parse(
                atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
            );

            // JWT subject contains email per backend implementation
            const subject = decoded.sub || decoded.subject || decoded.email || "";

            return subject ? subject.charAt(0).toUpperCase() : "U";

        } catch (e) {
            return "U";
        }

    };

    const initial = getUserInitial();

    return (

        <nav className="navbar">

            <div className="navbar-content">

                <div className="navbar-brand">

                    <div className="brand-icon">
                        ₹
                    </div>

                    <div>
                        <h2>FinTrack</h2>
                        <span>Personal Finance Tracker</span>
                    </div>

                </div>

                <div className="navbar-actions">

                    <div className="user-avatar">
                        {initial}
                    </div>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;