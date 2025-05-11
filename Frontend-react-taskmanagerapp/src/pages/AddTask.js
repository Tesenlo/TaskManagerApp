import React, { useState } from "react";
import Navbar from "../Navbar";
import '../css/AddTask.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddTask() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !status) {
      alert("Please fill in all fields.");
      return;
    }

    const taskData = {
      title,
      category,
      status
    };

    console.log("New Task:", taskData);
    const token = localStorage.getItem("authToken");
    try{
        const respone = await axios.post("http://localhost:8082/tasks/addTask", taskData, {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });
        if(respone.status === 201){
            alert("Congratualtions! New Task Created");
            navigate("/home");
        }
    }catch(error){
        alert("Something went wrong. Please try again.");
    }

    // Optionally send data to backend using axios
    // axios.post("/api/tasks", taskData)...
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Add New Task</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select category</option>
              <option value="Bug">Bug</option>
              <option value="Defect">Defect</option>
              <option value="Feature">Feature</option>
            </select>
          </div>

          <div>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
