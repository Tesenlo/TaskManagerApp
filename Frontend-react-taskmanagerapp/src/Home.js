import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./css/Home.css"; // Optional: For styling

function Home() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get("http://localhost:8082/tasks/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to Task Manager</h1>
        <div className="stats-cards">
          <div className="card total">Total Tasks: {stats.total}</div>
          <div className="card pending">Pending: {stats.pending}</div>
          <div className="card in-progress">In Progress: {stats.inProgress}</div>
          <div className="card completed">Completed: {stats.completed}</div>
        </div>
      </div>
    </>
  );
}

export default Home;
