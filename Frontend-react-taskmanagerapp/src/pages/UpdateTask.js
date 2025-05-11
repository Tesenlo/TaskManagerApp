import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    category: "",
    status: "",
  });

  // Fetch existing task by ID
  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem("authToken");
      console.log("token: ", token);

      try {
        const response = await axios.get(`http://localhost:8082/tasks/getTaskById/${id}`, {
          headers: { Authorization: `Bearer ${token}`, },
        });
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
        alert("Failed to load task.");
      }
    };

    fetchTask();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.put(`http://localhost:8082/tasks/updateTask/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        alert("Task updated successfully!");
        navigate("/allTasks");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Something went wrong while updating.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Update Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />

          <label>Category:</label>
          <select name="category" value={task.category} onChange={handleChange} required>
            <option value="">Select category</option>
            <option value="Bug">Bug</option>
            <option value="Defect">Defect</option>
            <option value="Feature">Feature</option>
          </select>

          <label>Status:</label>
          <select name="status" value={task.status} onChange={handleChange} required>
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit">Update Task</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTask;
