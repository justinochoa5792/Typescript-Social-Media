import React from "react";
import "./App.css";
// React Router
import { Route, Routes } from "react-router-dom";
// Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
