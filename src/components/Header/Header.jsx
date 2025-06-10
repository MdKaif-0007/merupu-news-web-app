import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiLogoPlayStore } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

const Header = () => {
  const location = useLocation();
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768); // md = 768px

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMobileDropdownOpen(false); // Close dropdown on resize to desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const allDistricts = [
    "hyderabad",
    "rangareddy",
    "vikarabad",
    "medchal",
    "adilabad",
    "asifabad",
    "nirmal",
    "mancherial",
    "nizamabad",
    "kamareddy",
    "karimnagar",
    "peddapally",
    "sircilla",
    "jagityal",
    "warangal",
    "hanmakonda",
    "janagama",
    "mahabubabad",
    "bhupalapalli",
    "mulugu",
    "khammam",
    "kothagudem",
    "mahbubnagar",
    "gadwala",
    "vanaparthi",
    "nagarkurnool",
    "narayanapet",
    "medak",
    "sangareddy",
    "siddipet",
    "nalgonda",
    "suryapet",
    "bhuvanagiri",
  ];

  const isExactPath = (path) => location.pathname === path;
  const isDistrictActive = (name) =>
    location.pathname.toLowerCase().includes(`/news/${name}`);

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-[#b6261b] text-[#ffffff] text-sm px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-3 text-[#ffffff] text-lg">
                       <a
                href="https://x.com/merupulu?lang=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-[#ffffff] text-lg cursor-pointer hover:scale-95" />
              </a>

              <a
                href="https://www.youtube.com/@merupulu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-[#ffffff] text-lg cursor-pointer hover:scale-95" />
              </a>
        </div>
        <div>{today}</div>
        <a 
           href="https://play.google.com/store/apps/datasafety?id=com.androtech.merupunews.prod"
           target="_blank"
           rel="noopener noreferrer"
          >
          <div className="bg-yellow-400 hover:bg-yellow-300 rounded-full px-3 py-1 gap-1 cursor-pointer text-black flex items-center">
           <BiLogoPlayStore />
        <p className=" font-semibold text-xs">
          Download our app
        </p>
        </div>
        </a>
      </div>

      {/* logo */}
      <div className="flex flex-col text-center pt-2 pb-4">
      <h1 className="text-6xl font-ramabhadra text-[#b6261b] py-3">
        మెరుపు న్యూస్​
      </h1>
      <p className="text-xs font-bold text-[#b6261b]">Merupu News</p>
      </div>

      {/* Navbar */}
      <nav className="bg-[#DBDBDB] text-black">
        <div className="flex flex-wrap justify-center items-center px-4 py-1 gap-4 text-md font-semibold relative z-20">
          <Link
            to="/"
            className={`cursor-pointer hover:text-[#b6261b] ${
              isExactPath("/")
                ? "underline underline-offset-8 decoration-2 text-[#b6261b]"
                : ""
            }`}
          >
            LATEST
          </Link>

          <Link
            to="/news/all-news"
            className={`cursor-pointer hover:text-[#b6261b] ${
              isExactPath("/news/all-news")
                ? "underline underline-offset-8 decoration-2 text-[#b6261b]"
                : ""
            }`}
          >
            TELANGANA
          </Link>

          <Link
            to={`/news/${allDistricts[0]}`}
            className={`cursor-pointer hover:text-[#b6261b] ${
              isDistrictActive(allDistricts[0])
                ? "underline underline-offset-8 decoration-2 text-[#b6261b]"
                : ""
            }`}
          >
            {allDistricts[0].toUpperCase()}
          </Link>

          {/* Responsive Dropdown for MORE */}
          <div
            className={`relative group cursor-pointer ${
              isMobileView ? "" : "hover-trigger"
            }`}
            onClick={() =>
              isMobileView && setIsMobileDropdownOpen(!isMobileDropdownOpen)
            }
          >
            <div className="flex items-center">
              <span className="hover:text-[#b6261b]">MORE</span>
              <MdKeyboardArrowDown size={20} />
            </div>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 md:left-0 mt-0 bg-white text-black rounded shadow-lg min-w-max z-30 max-h-72 overflow-y-auto 
              ${
                isMobileView
                  ? isMobileDropdownOpen
                    ? "block"
                    : "hidden"
                  : "hidden group-hover:block"
              }`}
            >
              {allDistricts.slice(1).map((dist, index) => (
                <Link
                  key={index}
                  to={`/news/${dist}`}
                  className={`block px-4 py-2 hover:bg-gray-300 whitespace-nowrap ${
                    isDistrictActive(dist) ? "text-[#b6261b] underline" : ""
                  }`}
                >
                  {dist.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   FaFacebookF, FaInstagram, FaLinkedinIn,
//   FaTelegramPlane, FaTwitter, FaYoutube
// } from 'react-icons/fa';
// import { MdKeyboardArrowDown } from "react-icons/md";

// const Header = () => {
//   const location = useLocation();

//   const today = new Date().toLocaleDateString('en-US', {
//     weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
//   });

//   const allDistricts = [
//     "hyderabad", "rangareddy", "vikarabad", "medchal", "adilabad", "asifabad", "nirmal",
//     "mancherial", "nizamabad", "kamareddy", "karimnagar", "peddapally", "sircilla","jagityal","warangal","hanmakonda",
//     "janagama","mahabubabad","bhupalapalli","mulugu","khammam","kothagudem","mahbubnagar","gadwala","vanaparthi",
//     "nagarkurnool","narayanapet","medak","sangareddy","siddipet","nalgonda","suryapet","bhuvanagiri",
//   ];

//   const isExactPath = (path) => location.pathname === path;
//   const isDistrictActive = (name) =>
//     location.pathname.toLowerCase().includes(`/news/${name}`);

//   return (
//     <header>
//       {/* Top Bar */}
//       <div className="bg-black text-white text-sm px-4 py-2 flex justify-between items-center">
//         <div className="flex items-center space-x-3 text-orange-500 text-lg">
//           <FaFacebookF className='cursor-pointer hover:scale-95' />
//           <FaInstagram className='cursor-pointer hover:scale-95' />
//           <FaLinkedinIn className='cursor-pointer hover:scale-95' />
//           <FaTelegramPlane className='cursor-pointer hover:scale-95' />
//           <FaTwitter className='cursor-pointer hover:scale-95' />
//           <FaYoutube className='cursor-pointer hover:scale-95' />
//         </div>
//         <div>{today}</div>
//         <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-3 py-1 rounded-full text-xs">
//           Support our Journalism!
//         </button>
//       </div>

//       {/* Logo */}
//       <div className="text-center my-6">
//         <h1 className="text-5xl font-serif text-orange-700 font-bold">Merupu News</h1>
//       </div>

//       {/* Navbar */}
//       <nav className="bg-black text-white">
//         <div className="flex flex-wrap justify-center items-center px-4 py-3 gap-4 text-sm font-semibold relative z-20">

//           <Link
//             to="/"
//             className={`cursor-pointer ${isExactPath("/") ? "underline underline-offset-8 text-orange-600" : ""}`}
//           >
//             BREAKING NEWS
//           </Link>

//           <Link
//             to="/news/all-news"
//             className={`cursor-pointer ${isExactPath("/news/all-news") ? "underline underline-offset-8 text-orange-600" : ""}`}
//           >
//             ALL NEWS
//           </Link>

//           <Link
//             to={`/news/${allDistricts[0]}`}
//             className={`cursor-pointer ${isDistrictActive(allDistricts[0]) ? "underline underline-offset-8 text-orange-600" : ""}`}
//           >
//             {allDistricts[0].toUpperCase()}
//           </Link>

//           {/* Hover Dropdown for MORE */}
//           <div className="relative group cursor-pointer">
//             <div className='flex items-center'>
//               <span className="hover:text-orange-700">MORE</span>
//               <MdKeyboardArrowDown size={20} />
//             </div>
//             <div className="absolute left-0 mt-0 bg-black text-white rounded shadow-lg hidden group-hover:block min-w-max z-30 max-h-72 overflow-y-auto">
//               {allDistricts.slice(1).map((dist, index) => (
//                 <Link
//                   key={index}
//                   to={`/news/${dist}`}
//                   className={`block px-4 py-2 hover:bg-gray-800 whitespace-nowrap ${
//                     isDistrictActive(dist) ? "text-orange-600 underline" : ""
//                   }`}
//                 >
//                   {dist.toUpperCase()}
//                 </Link>
//               ))}
//             </div>
//           </div>

//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
