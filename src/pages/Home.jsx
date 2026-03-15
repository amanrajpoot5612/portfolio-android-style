import React from "react";
import PhoneFrame from "../components/PhoneFrame";
import bgImage from "../assets/wallpaper/wallpaper1.jpg";
import Dock from "../components/Dock";
import Slider from "../components/Slider";
import Battery from "../assets/topbar/battery.svg";
import Mute from "../assets/topbar/mute.svg";
import Signal from "../assets/topbar/signal.svg";
import Clock from "../utils/Clock";

const Home = () => {
  return (
    // Home page wrapper
<div
  className="h-[calc(100%-26px)] w-full bg-cover bg-center bg-no-repeat flex flex-col"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* STATUS BAR */}
  <div className="flex-shrink-0 flex justify-between items-center px-5 pt-6 pb-0 h-[48px]">
    <Clock />
    <div className="flex gap-1.5 items-center">
      <img src={Mute}    alt="" className="w-3.5 h-3.5 invert" />
      <img src={Signal}  alt="" className="w-3.5 h-3.5 invert" />
      <img src={Battery} alt="" className="w-5 h-3.5 invert" />
    </div>
  </div>

  {/* SLIDER — flex-1 + min-h-0 so it never bleeds into dock */}
  <div className="flex-1 min-h-0 w-full overflow-hidden">
    <Slider className="w-full h-full" />
  </div>

  {/* DOCK */}
  <div className="flex-shrink-0 flex justify-center items-center px-3 py-2 pb-3">
    <Dock />
  </div>
</div>
  );
};

export default Home;
