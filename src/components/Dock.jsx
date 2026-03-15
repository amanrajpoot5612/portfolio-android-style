import React from "react";
import instagram from "../assets/apps/instagram.svg";
import cameraImg from "../assets/apps/native-apps/Camera.png";
import filesImg from "../assets/apps/native-apps/MyFiles.png";
import galleryImg from "../assets/apps/native-apps/Gallery.png";
import chromeImg from "../assets/apps/google/Chrome.png";
import pdfImg from "../assets/apps/native-apps/WriteonPDF.png";
import gmailImg from "../assets/apps/native-apps/Email.png";

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
            className="flex flex-col items-center justify-center h-full w-full rounded-xl overflow-hidden cursor-pointer drop-shadow-lg"
          >
            <img
              src={app.icon}
              className="h-full w-full object-contain"
              alt={app.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dock;
