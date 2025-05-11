# **Task Manager Application**

## **📌 Overview**

Task Manager is a full-stack web application built using React (frontend) and Spring Boot (backend). It allows users to register, log in, and manage tasks by creating, updating, and deleting them.

## **✨ Features**

\- User registration and login

\- Secure authentication using JWT

\- Create, update, and delete tasks

\- Filter tasks by category and status

\- Intuitive UI with modern design

## **🛠️ Tech Stack**

* Frontend:  
* • React  
* • Axios  
* • React Router DOM  
* • CSS3  
* Backend:  
* • Spring Boot  
* • Spring Security  
* • MySQL  
* • JPA & Hibernate  
* • JWT (JSON Web Token)

## **⚙️ Setup Instructions**

### **Frontend**

1\. Navigate to the \`frontend\` directory.  
2\. Run \`npm install\` to install dependencies.  
3\. Run \`npm start\` to launch the frontend on \`http://localhost:3000\`.

### **Backend**

1\. Navigate to the \`backend\` directory in your IDE (e.g., IntelliJ or Eclipse).  
2\. Configure your \`application.properties\` file:  
   \- Set your local MySQL database credentials:  
     \`spring.datasource.username=your\_mysql\_username\`  
     \`spring.datasource.password=your\_mysql\_password\`  
3\. Ensure MySQL is running and the \`TaskManager\` database exists.  
4\. Run the application. It will start on \`http://localhost:8082\`.

## **📡 API Endpoints**

POST /addUser – Register a new user

POST /loginUser – Authenticate and return JWT token

GET /tasks/getAllTasks – Fetch all tasks

GET /tasks/getTaskById/{id} – Fetch task by ID

POST /tasks/addTask – Create a new task

PUT /tasks/updateTask/{id} – Update a task

DELETE /tasks/deleteTask/{id} – Delete a task
