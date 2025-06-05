import React, { forwardRef } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';
import merupuLogo from '../../assets/merupuLogo.png'


const Footer = forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="bg-gray-200 text-black">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Block - Logo + Contact + Social */}
        <div className="space-y-3">
         <div className='flex items-center gap-1'>
          <img src={merupuLogo} alt="" className='h-12' />
           <h1 className="text-3xl font-bold text-[#b6261b]">Merupu News</h1>
         </div>
          <p className="text-sm">Substance of Print, Reach of Digital</p>
          <p className="text-sm">Contact us: <span className="text-[#b6261b]">feedback@merupu.in</span></p>
          <p className="mt-4 font-semibold">FOLLOW US</p>
          <div className="flex space-x-3 mt-2">
            <FaFacebookF className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
            <FaInstagram className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
            <FaLinkedinIn className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
            <FaTelegramPlane className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
            <FaTwitter className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
            <FaYoutube className="text-[#b6261b] text-lg cursor-pointer hover:scale-95" />
          </div>
        </div>

        {/* Column 1 */}
        <div className="space-y-2 text-sm">
          <p>Politics</p>
          <p>Governance</p>
          <p>Economy</p>
          <p>Defence</p>
          <p>India</p>
          <p>World</p>
        </div>

      </div>

      {/* Black Strip with Sections */}
      <div className="bg-white py-3 text-center text-sm font-medium space-x-4 overflow-x-auto whitespace-nowrap">
        <span className="text-black">Merupu Hindi</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu Tamil</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu Marathi</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu Store</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu Speakers Bureau</span>
        <span className="text-[#b6261b]">|</span>
        <span className="text-black">Merupu School Of Journalism</span>
      </div>

      {/* Copyright Strip */}
      <div className="bg-[#b6261b] py-4 text-center text-sm text-white space-x-4">
        <span>Copyright © 2025 Printline Media Pvt. Ltd. All rights reserved.</span>
        <span>About</span>
        <span>Code Of Ethics</span>
        <span>Contact</span>
        <span>Synergy</span>
        <span>Careers</span>
        <span>Terms of Use</span>
        <span>Privacy Policy</span>
      </div>
    </footer>
  );
});

export default Footer;
