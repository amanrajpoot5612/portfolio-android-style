import React from "react";
import Clock from "../utils/Clock";
import Battery from "../assets/topbar/battery.svg";
import Mute from "../assets/topbar/mute.svg";
import Signal from "../assets/topbar/signal.svg";

const AppLayout = ({ Children }) => {
  return (
    <section className="flex flex-col p-3">
      {/* details panel */}
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
      {Children}
    </section>
  );
};

export default AppLayout;
