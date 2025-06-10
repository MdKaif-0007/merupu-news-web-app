import React, { forwardRef } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import merupuLogo from "../../assets/merupuLogo.png";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  const isContactPage = location.pathname === "/contact";
  const isprivacyPage = location.pathname === "/privacy";

  return (
    <footer className="bg-gray-200 text-black ">
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
              <span className="text-[#b6261b]">contact@merupulu.com</span>
            </p>
            <p className="mt-4 font-semibold">FOLLOW US</p>
            <div className="flex justify-center space-x-3 mt-2">
              <a
                href="https://x.com/merupulu?lang=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
              </a>

              <a
                href="https://www.youtube.com/@merupulu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
              </a>
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
        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (isAboutPage) e.preventDefault(); // prevent navigating again
          }}
        >
          <span>About</span>
        </a>
        <a
          href="/contact"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (isContactPage) e.preventDefault(); // prevent navigating again
          }}
        >
          <span>Contact</span>
        </a>
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (isprivacyPage) e.preventDefault(); // prevent navigating again
          }}
        >
          <span>Privacy Policy</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
