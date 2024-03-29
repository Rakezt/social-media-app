import React from "react";
import NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";
import { Link } from "react-router-dom";
import icon from "../Assets/images/icon.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 w-full px-44 py-2">
      <img src={icon} className="App-logo h-8 mr-4" alt="logo" />
      <Link to="/">
        <div className="text-3xl font-extrabold text-gray-900 dark:text-white font-roboto">
          <span className="text-transparent bg-clip-text bg-blue-400">
            Social Vibe
          </span>
        </div>
      </Link>
      <div className="flex justify-centered items-center mx-auto">
        <NavLinks />
      </div>
      <div>
        <UserLinks />
      </div>
    </div>
  );
};

export default Navbar;
