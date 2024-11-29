import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<h1>Movie List Page</h1>} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
