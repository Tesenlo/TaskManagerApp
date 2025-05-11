import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "../css/Tasks.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem("authToken");

            try {
                const response = await axios.get("http://localhost:8082/tasks", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                

                // const data = await response.json();
                setTasks(response.data);
                setFilteredTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    useEffect(() => {
        let filtered = tasks;

        if (searchTitle) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
        }

        if (categoryFilter) {
            filtered = filtered.filter(task => task.category === categoryFilter);
        }

        if (statusFilter) {
            filtered = filtered.filter(task => task.status === statusFilter);
        }

        setFilteredTasks(filtered);
    }, [searchTitle, categoryFilter, statusFilter, tasks]);

    const navigate = useNavigate();

    const handleDelete = async (id) =>{
        const confirm = window.confirm("Are you sure you want to delete this task?");
        if(!confirm) return;

        try{
            const token = localStorage.getItem("authToken");
            await axios.delete(`http://localhost:8082/tasks/deleteTask/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(prev => prev.filter(task => task.id !== id));
            alert("Task deleted successfully");
        }catch(error){
            alert("Failed to delete task. Please try again.");
            console.error(error);
        }
    };

    const handleUpdate = (id) =>{
        navigate(`/updateTask/${id}`);
    };

    return (
        <div>
            <Navbar />
            <div className="tasks-container">
                <h1>All Tasks</h1>

                {/* Filters */}
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />

                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Bug">Bug</option>
                        <option value="Defect">Defect</option>
                        <option value="Feature">Feature</option>
                    </select>

                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* Table */}
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.category}</td>
                                    <td>{task.status}</td>
                                    <td>
                                        <button
                                        className="update-btn"
                                        onClick={() => handleUpdate(task.id)}>Update</button>
                                        <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(task.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No tasks found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Tasks;
