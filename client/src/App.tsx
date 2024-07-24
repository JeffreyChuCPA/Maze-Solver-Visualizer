import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import BuildBoard from "./pages/BuildBoard";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/build-board" element={<BuildBoard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
