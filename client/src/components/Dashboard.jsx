import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const { setUser } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token
        setUser(null); // Reset user state
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <div className="dashboard">
            <nav className="dash-navbar">
                <h1 className="dashboard-heading">Mini CRM Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <div className="dashboard-main">
                <div className="welcome-section">
                    <h2>Welcome to Your Dashboard</h2>
                    <p>Manage your audience and campaigns efficiently using Mini CRM.</p>
                </div>
                <div className="options-section">
                    <RouterLink to="/audience" className="option-link">
                        <div className="option-card">
                            <h3>Create Audience</h3>
                            <p>Organize your audience by creating tailored segments.</p>
                        </div>
                    </RouterLink>
                    <RouterLink to="/campaigns" className="option-link">
                        <div className="option-card">
                            <h3>Manage Campaigns</h3>
                            <p>Run, monitor, and analyze your marketing campaigns.</p>
                        </div>
                    </RouterLink>
                </div>
                <div className="filler-section">
                    <h3>Tips for Using Mini CRM</h3>
                    <ul>
                        <li>Stay organized by segmenting your audience effectively.</li>
                        <li>Use personalized messages for better campaign performance.</li>
                        <li>Analyze campaign metrics to improve future outcomes.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
