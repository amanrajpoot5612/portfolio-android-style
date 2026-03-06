import { Outlet } from "react-router-dom";
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

export default function MainLayout() {
  return (
    <div className="min-h-screen h-screen flex flex-col justify-center items-center bg-gray-200">
      <main
        className="
      relative
    h-[90vh]
    max-h-[750px]
    w-auto
    aspect-[9/19.5]
    max-w-[375px]
    rounded-[12px]
    overflow-hidden
    bg-black
    shadow-xl
    "
      >
        {/* Screen Content */}
        <div className="w-full h-full overflow-hidden">
          <Outlet />
        </div>

        {/* Punch Hole */}
        <div
          className="
    pointer-events-none
    absolute
    top-3
    left-1/2
    -translate-x-1/2
    w-4 h-4
    bg-black
    rounded-full
    z-50
  "
        />

        {/* Navigation Bar */}
        <div
          className="
          navigation-bar
    pointer-events-none
    absolute
    bottom-0
    left-0
    w-full
    h-10
    bg-white/20
    backdrop-blur-xs
    flex
    items-center
    justify-around
    z-50
  "
        >
          {/* Recents */}
          <img src={recent24} alt="" className="nav-button" />
          {/* Home */}
          <img src={home24} alt="" className="nav-button" />
          {/* Back */}
          <img src={back2} alt="back" className="nav-button" />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
