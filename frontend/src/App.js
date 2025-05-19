import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Dashboard/Appointments';
import Home from './pages/Home';
import Register from './pages/Register';
import PublicRoute from './components/PublicRoute';
import Navbar from './components/Navbar';
import ModalRenderer from './components/ModalRenderer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route path="appointments" element={<Appointments />} />
        </Route>
      </Routes>
      <ModalRenderer />
      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
}

export default App;
