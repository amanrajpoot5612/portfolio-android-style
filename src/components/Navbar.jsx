import React from "react";
// import linkedinAnimated from "../assets/icons/linkedin-animated.gif";
// import twitterAnimated from "../assets/icons/twitter-animated.gif";
// import githubAnimated from "../assets/icons/github-animated.gif";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="max-w-7/10 flex bg-red-600">
      <div className="left flex justify-between items-center w-full">
        {/* <h1 className="text-2xl font-bold">My Portfolio</h1> */}
        <ul className="flex">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </div>
      {/* <div className="right flex justify-between items-center w-full">
        <img src={linkedinAnimated} alt="" width={20} height={20} srcset="" />
        <img src={twitterAnimated} alt="" width={20} height={20} srcset="" />
        <img src={githubAnimated} alt="" width={20} height={20} srcset="" />
      </div> */}
    </header>
  );
};

export default Navbar;
