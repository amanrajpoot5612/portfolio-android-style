import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import recent24 from "../assets/navigation/icons8-menu-24.svg";
import recent384 from "../assets/navigation/icons8-menu-384.svg";
import home24 from "../assets/navigation/icons8-home-24.svg";
import home384 from "../assets/navigation/icons8-home-384.svg";
import back64 from "../assets/navigation/icons8-back-64.png";
import back from "../assets/navigation/chevron-left.svg";
import back1 from "../assets/navigation/chevron-left-b.svg";
import back2 from "../assets/navigation/back-arrow-1.svg";
import { useState } from "react";

export default function MainLayout() {
  const [activeBtn, setActiveBtn] = useState(null);
  const handlePress = (btn) => {
    setActiveBtn(btn);

    setTimeout(() => {
      setActiveBtn(null);
    }, 500);
  };

  const createRipple = (event) => {
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      {/* DEVICE BODY */}
      <div
        className="
      relative
      p-[14px]
      rounded-[42px]
      bg-gradient-to-b
      from-neutral-700
      via-neutral-900
      to-black
      shadow-[0_40px_120px_rgba(0,0,0,0.6)]
      "
      >
        {/* SIDE BUTTONS */}

        {/* Volume */}
        <div className="absolute -right-[3px] top-[160px] w-[4px] h-[60px] bg-neutral-800 rounded-r-md shadow-inner" />

        {/* Volume Down */}
        <div className="absolute -right-[3px] top-[230px] w-[4px] h-[60px] bg-neutral-800 rounded-r-md shadow-inner" />

        {/* Power */}
        <div className="absolute -right-[3px] top-[320px] w-[4px] h-[70px] bg-neutral-700 rounded-r-md shadow-inner" />

        {/* SCREEN */}
        <main
          className="
        relative
        h-[90vh]
        max-h-[750px]
        w-auto
        aspect-[9/19.5]
        max-w-[375px]
        rounded-[32px]
        overflow-hidden
        bg-black
        shadow-inner
        "
        >
          {/* SCREEN GLASS EFFECT */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20 z-10" />

          {/* YOUR SCREEN CONTENT */}
          <div className="w-full h-full overflow-hidden relative z-0">
            <Outlet />
          </div>

          {/* PUNCH HOLE */}
          <div
            className="
          pointer-events-none
          absolute
          top-3
          left-1/2
          -translate-x-1/2
          w-[14px]
          h-[14px]
          bg-black
          rounded-full
          z-50
          shadow-inner
          "
          />

          {/* NAVIGATION BAR */}
          <div
            className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          w-full
          h-10
          bg-white/20
          backdrop-blur-sm
          flex
          items-center
          justify-around
          z-50
          "
          >
            <div
              className="ripple-container flex-1 rounded-md pointer-events-auto flex justify-center items-center"
              onClick={createRipple}
            >
              <span
                className={`px-4 py-1 rounded-md transition-colors duration-300 ${activeBtn === "recent" ? "bg-orange-600" : ""}`}
                // onClick={() => handlePress("recent")}
              >
                <img src={recent24} alt="" className="nav-button" />
              </span>
            </div>
            <div
              className="ripple-container flex-1 rounded-md pointer-events-auto transition-colors duration-200  flex justify-center items-center"
              onClick={createRipple}
            >
              <span
                className={` px-4 py-1 rounded-md transition-colors duration-300 ${activeBtn === "home" ? "bg-orange-600" : ""}`}
                onClick={() => navigate("/")}
              >
                <img src={home24} alt="" className="nav-button" />
              </span>
            </div>
            <div
              className="ripple-container flex-1 rounded-md pointer-events-auto transition-colors duration-200  flex justify-center items-center"
              onClick={createRipple}
            >
              <span
                className={`px-4 py-1 rounded-md transition-colors duration-300 ${activeBtn === "back" ? "bg-orange-600" : ""}`}
                // onClick={() => handlePress("back")}
              >
                <img src={back2} alt="" className="nav-button" />
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
