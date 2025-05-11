import react from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("authToken"); //clear the token
        navigate("/login"); //navigate to login page
    }
    return (
        <div>
        <h1>This is the Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Dashboard;
