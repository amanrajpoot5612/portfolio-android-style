import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/layout.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import "./index.css";
import Boot from "./components/ui/Boot";
import CameraApp from "./components/Apps/Camera.jsx";
import Gallery from "./components/Apps/Gallery/Gallery.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import Resume from "./components/Apps/Resume.jsx";
import Chrome from "./components/Apps/Chrome.jsx";
import SocialsApp from "./components/Apps/Socials/SocialsApp.jsx";

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
          <Route
            path="/gallery"
            element={<AppLayout Children={<Gallery />} />}
          />
          <Route path="/resume" element={<AppLayout Children={<Resume />} />} />
          <Route path="/chrome" element={<AppLayout Children={<Chrome />} />} />
          <Route path="/socials" element={<AppLayout Children={<SocialsApp />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
