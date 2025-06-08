import React, { forwardRef } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import merupuLogo from "../../assets/merupuLogo.png";
import { Link } from "react-router-dom";

const Footer = forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="bg-gray-200 text-black ">
      {/* Top Section */}
      <div className="w-full py-10 px-4">
        <div className="max-w-7xl w-full mx-auto">
          {/* Left Block - Logo + Contact + Social */}
          <div className="space-y-3 flex flex-col items-center text-center">
            <div className="flex items-center gap-1 justify-center">
              <img src={merupuLogo} alt="" className="h-12" />
              <h1 className="text-3xl font-bold text-[#b6261b]">Merupu News</h1>
            </div>
            <p className="text-sm">Subsidary of merupulu media services</p>
            <p className="text-sm">
              Contact us:{" "}
              <span className="text-[#b6261b]">bolgam2@gmail.com</span>
            </p>
            <p className="mt-4 font-semibold">FOLLOW US</p>
            <div className="flex justify-center space-x-3 mt-2">
              <FaFacebookF className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
              <FaInstagram className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
              <FaLinkedinIn className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
              <FaTelegramPlane className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
              <Link to="https://x.com/merupulu?lang=en">
                <FaTwitter className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
              </Link>
              <Link to="https://www.youtube.com/@merupulu">
                <FaYoutube className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Black Strip with Sections */}
      <div className="bg-white py-3 text-center text-sm font-medium space-x-4 overflow-x-auto whitespace-nowrap">
        <span className="text-black">Merupu News</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu News</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu News</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu News</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu News</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu News</span>
      </div>

      {/* Copyright Strip */}
      <div className="bg-[#b6261b] py-4 text-center text-sm text-white space-x-4 cursor-pointer">
        <span>
          Copyright © 2025 merupulu media services : All rights reserved.
        </span>
        <Link to='/about'>
          <span>About</span>
        </Link>
        <Link to='/contact'>
          <span>Contact</span>
        </Link>
        <Link to='/privacy'>
          <span>Privacy Policy</span>
        </Link>
      </div>
    </footer>
  );
});

export default Footer;
