import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddRoom from './components/AddRoom';
import OwnerSignup from './components/Owner_signup';
import OwnerLogin from './components/Owner_login';
import Footer from './components/Footer';
import RoomDetails from './components/RoomDetails';
import Profile from './components/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/owner_signup" element={<OwnerSignup />} />
        <Route path="/owner_login" element={<OwnerLogin />} />
        <Route path="/addroom" element={isLoggedIn ? <AddRoom /> : <Navigate to="/login" />} />
        <Route path="/roomdetails/:id" element={<RoomDetails />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />  
    </Router>
  );
}

export default App;