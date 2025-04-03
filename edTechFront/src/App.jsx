import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import PrivateRoute from './components/PrivateRoute';
import Course from "./pages/Courses";
import Home from './pages/Home';
import Signup from './pages/Signup';

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<PrivateRoute><Course /></PrivateRoute>} />
      </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
