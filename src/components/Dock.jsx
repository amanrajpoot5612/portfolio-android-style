import React from "react";
import instagram from "../assets/apps/instagram.svg";
import cameraImg from "../assets/apps/camera.png";
import filesImg from "../assets/apps/files.png";
import galleryImg from "../assets/apps/gallery.png";
import chromeImg from "../assets/apps/chrome.png";
import pdfImg from "../assets/apps/pdf.png";
import gmailImg from "../assets/apps/gmail.png";

const Dock = () => {
  const apps = [
    { name: "Camera", icon: cameraImg },
    { name: "Projects", icon: filesImg },
    { name: "Gallery", icon: galleryImg },
    { name: "About", icon: chromeImg },
    { name: "Resume", icon: pdfImg },
    { name: "Contact", icon: gmailImg },
  ];
  return (
    <div className="w-fit h-fit bg-black/30 backdrop-blur-md flex justify-center items-center rounded-md">
      <ul className="flex gap-2 min-h-fit py-2 px-4">
        {apps.map((app) => (
          <li
            key={app.name}
            className="flex flex-col items-center justify-center"
          >
            <img
              src={app.icon}
              className="h-10 w-10 object-contain cursor-pointer"
              alt={app.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dock;
