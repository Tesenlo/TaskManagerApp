import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from './assets/task-manager-logo-white.png'; // adjust path if needed
import "./css/Navbar.css"; // ensure your CSS is imported

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("authToken");
        navigate("/login", { replace: true });
    };

    return (
        <nav className="nav">
            <NavLink to="/home" className="site-title">
                <img src={logo} alt="Logo" className="logo" />
                Task Manager
            </NavLink>
            <ul>
                <li>
                    <NavLink to="/allTasks" className={({ isActive }) => isActive ? "active" : undefined}>Tasks</NavLink>
                </li>
                <li>
                    <NavLink to="/addTask" className={({ isActive }) => isActive ? "active" : undefined}>Add Task</NavLink>
                </li>
                <li>
                    <NavLink to="#" className={({ isActive }) => isActive ? "active" : undefined} onClick={handleLogout}>Logout</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
