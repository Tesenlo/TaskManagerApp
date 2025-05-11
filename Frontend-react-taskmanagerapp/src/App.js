import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import Navbar from './Navbar';
import UpdateTask from './pages/UpdateTask';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Login />}/>
      <Route path = "/login" element={<Login />}/>
      <Route path = "/register" element={<Register/>}/>
      

      {/*Protected Routes */}
      <Route path = "/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path = "/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path = "/allTasks" element={<ProtectedRoute><Tasks/></ProtectedRoute>}/>
      <Route path = "/addTask" element={<ProtectedRoute><AddTask/></ProtectedRoute>}/>
      <Route path = "/navbar" element={<ProtectedRoute><Navbar/></ProtectedRoute>}/>
      <Route path = "/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path = "updateTask/:id" element={<ProtectedRoute><UpdateTask/></ProtectedRoute>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
