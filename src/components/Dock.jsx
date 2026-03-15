import React from "react";
import instagram from "../assets/apps/instagram.svg";
import filesImg from "../assets/apps/native-apps/MyFiles.png";
import chromeImg from "../assets/apps/google/Chrome.png";
import pdfImg from "../assets/apps/native-apps/WriteonPDF.png";
import gmailImg from "../assets/apps/native-apps/Email.png";
import cameraImg from "../assets/apps/native-apps/Camera.png";
import galleryImg from "../assets/apps/native-apps/Gallery.png";

const Dock = () => {
  const apps = [
    { name: "Camera", icon: cameraImg, path: "camera" },
    { name: "Projects", icon: filesImg, path: "gallery" },
    { name: "Gallery", icon: galleryImg, path: "gallery" },
    { name: "About", icon: chromeImg, path: "chrome" },
    { name: "Resume", icon: pdfImg, path: "resume" },
    {
      name: "Contact",
      icon: gmailImg,
      externalUrl: "mailto:amanrajpoot5612@gmail.com",
      popup: {
        label: "Contact",
        desc: "Best way to reach me for collabs, freelance, or just a chat.",
        accent: "#e8d5fb",
        gradient: "linear-gradient(135deg,#161b22,#0d1117)",
        actions: [
          { label: "Open Profile", primary: true },
          { label: "Copy Link" },
        ],
      },
    },
  ];

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.12)",
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        gap: 6,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      {apps.map((app) => (
        <div
          key={app.name}
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            overflow: "hidden",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "transform 0.12s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.88)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={app.icon}
            alt={app.name}
            style={{
              width: 38,
              height: 38,
              objectFit: "contain",
              filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.5))",
            }}
          />
        </div>
      ))}
    </div>
  );
};
export default Dock;
