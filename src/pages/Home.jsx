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
    <div
      className="h-[calc(100%-26px)] w-full bg-cover bg-center bg-no-repeat flex flex-col items-center p-0.5 pb-2 gap-2"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 20px space */}
      <div className="h-[20px] w-full flex justify-between">
        <div className="left-top-b flex ">
          <p>
            <Clock />
          </p>
        </div>
        <div className="right-top-b flex gap-1 items-center">
          <img src={Mute} alt="" srcset="" className="w-4 h-4 invert-100" />
          <img src={Signal} alt="" srcset="" className="w-4 h-4 invert-100" />
          <img src={Battery} alt="" srcset="" className="w-4 h-4 invert-100" />
        </div>
      </div>

      {/* slider takes remaining height */}
      <div className="flex-1 w-full flex min-h-0 items-center justify-center">
        <Slider className="w-full h-full" />
      </div>

      {/* dock takes content height */}
      <div className="">
        <Dock />
      </div>
    </div>
  );
};

export default Home;
