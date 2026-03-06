import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/layout.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import "./index.css";
import Boot from "./components/ui/Boot";
import CameraApp from "./components/Apps/Camera.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Boot />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/camera" element={<CameraApp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
