import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaFacebookF, FaInstagram, FaLinkedinIn,
  FaTelegramPlane, FaTwitter, FaYoutube
} from 'react-icons/fa';
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const location = useLocation();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  const allDistricts = [
    "hyderabad", "rangareddy", "vikarabad", "medchal", "adilabad", "asifabad", "nirmal",
    "mancherial", "nizamabad", "kamareddy", "karimnagar", "peddapally", "sircilla","jagityal","warangal","hanmakonda",
    "janagama","mahabubabad","bhupalapalli","mulugu","khammam","kothagudem","mahbubnagar","gadwala","vanaparthi",
    "nagarkurnool","narayanapet","medak","sangareddy","siddipet","nalgonda","suryapet","bhuvanagiri",
  ];

  const isExactPath = (path) => location.pathname === path;
  const isDistrictActive = (name) =>
    location.pathname.toLowerCase().includes(`/news/${name}`);

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-black text-white text-sm px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-3 text-orange-500 text-lg">
          <FaFacebookF className='cursor-pointer hover:scale-95' />
          <FaInstagram className='cursor-pointer hover:scale-95' />
          <FaLinkedinIn className='cursor-pointer hover:scale-95' />
          <FaTelegramPlane className='cursor-pointer hover:scale-95' />
          <FaTwitter className='cursor-pointer hover:scale-95' />
          <FaYoutube className='cursor-pointer hover:scale-95' />
        </div>
        <div>{today}</div>
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-3 py-1 rounded-full text-xs">
          Support our Journalism!
        </button>
      </div>

      {/* Logo */}
      <div className="text-center my-6">
        <h1 className="text-5xl font-serif text-orange-700 font-bold">Merupu News</h1>
      </div>

      {/* Navbar */}
      <nav className="bg-black text-white">
        <div className="flex flex-wrap justify-center items-center px-4 py-3 gap-4 text-sm font-semibold relative z-20">

          <Link
            to="/"
            className={`cursor-pointer ${isExactPath("/") ? "underline underline-offset-8 text-orange-600" : ""}`}
          >
            BREAKING NEWS
          </Link>

          <Link
            to="/news/all-news"
            className={`cursor-pointer ${isExactPath("/news/all-news") ? "underline underline-offset-8 text-orange-600" : ""}`}
          >
            ALL NEWS
          </Link>

          <Link
            to={`/news/${allDistricts[0]}`}
            className={`cursor-pointer ${isDistrictActive(allDistricts[0]) ? "underline underline-offset-8 text-orange-600" : ""}`}
          >
            {allDistricts[0].toUpperCase()}
          </Link>

          {/* Hover Dropdown for MORE */}
          <div className="relative group cursor-pointer">
            <div className='flex items-center'>
              <span className="hover:text-orange-700">MORE</span>
              <MdKeyboardArrowDown size={20} />
            </div>
            <div className="absolute left-0 mt-0 bg-black text-white rounded shadow-lg hidden group-hover:block min-w-max z-30 max-h-72 overflow-y-auto">
              {allDistricts.slice(1).map((dist, index) => (
                <Link
                  key={index}
                  to={`/news/${dist}`}
                  className={`block px-4 py-2 hover:bg-gray-800 whitespace-nowrap ${
                    isDistrictActive(dist) ? "text-orange-600 underline" : ""
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














// src/components/Header.jsx
// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   FaFacebookF, FaInstagram, FaLinkedinIn,
//   FaTelegramPlane, FaTwitter, FaYoutube
// } from 'react-icons/fa';
// import { FiSearch } from 'react-icons/fi';

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const today = new Date().toLocaleDateString('en-US', {
//     weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
//   });

//   const districts = [
//     "mancherial", "nizamabad", "kamareddy", "karimnagar",
//   ];

//   const activeCategory = (cat) =>
//     location.pathname.includes(cat.toLowerCase().replace(/\s+/g, '-'));

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
//         <h1 className="text-5xl font-serif text-orange-700 font-bold">ThePrint</h1>
//       </div>

//       {/* Navbar */}
//       <nav className="bg-black text-white">
//         <ul className="flex flex-wrap justify-center items-center px-4 py-3 gap-4 text-sm font-semibold relative">
//           <li className="cursor-pointer" onClick={() => navigate("/")}>🏠</li>

//           <li
//             className={`cursor-pointer ${activeCategory("breaking-news") ? "text-orange-600 underline" : ""}`}
//             onClick={() => navigate("/news/breaking-news")}
//           >
//             BREAKING NEWS
//           </li>

//           <li onClick={() => navigate("/news/all-news")} className="cursor-pointer">ALL NEWS</li>
//           <li onClick={() => navigate("/news/hydrabad")} className="cursor-pointer">HYDRABAD</li>
//           <li onClick={() => navigate("/news/rangareddy")} className="cursor-pointer">RANGAREDDY</li>
//           <li onClick={() => navigate("/news/vikarabad")} className="cursor-pointer">VIKARABAD</li>
//           <li onClick={() => navigate("/news/medchal")} className="cursor-pointer">MEDCHAL</li>
//           <li onClick={() => navigate("/news/adilabad")} className="cursor-pointer">ADILABAD</li>

//           {/* Hover Dropdown for MORE */}
//           <li className="relative group cursor-pointer">
//             <span className="hover:text-orange-700">MORE</span>
//             <ul className="absolute left-0 mt-0 bg-black text-white rounded shadow-lg hidden group-hover:block min-w-max z-10">
//               {districts.map((dist, index) => (
//                 <li
//                   key={index}
//                   className="px-4 py-2 hover:bg-gray-800 cursor-pointer whitespace-nowrap"
//                   onClick={() => navigate(`/news/${dist}`)}
//                 >
//                   {dist.toUpperCase()}
//                 </li>
//               ))}
//             </ul>
//           </li>

//           <li className="cursor-pointer">
//             <FiSearch size={18} />
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;





















// import React from 'react'
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTelegramPlane, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { FiSearch } from 'react-icons/fi';

// const Header = () => {
//   const today = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric',
//   });

//   const districts = [
//     "mancherial",
//     "nizamabad",
//     "kamareddy",
//     "karimnagar",
//   ];

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
//         <h1 className="text-5xl font-serif text-orange-700 font-bold">ThePrint</h1>
//       </div>

//       {/* Navbar */}
//       <nav className="bg-black text-white">
//         <ul className="flex flex-wrap justify-center items-center px-4 py-3 gap-4 text-sm font-semibold relative">
//           <li className="cursor-pointer">🏠</li>
//           <li className="cursor-pointer">BREAKING NEWS</li>
//           <li className="cursor-pointer">ALL NEWS</li>
//           <li className="cursor-pointer">HYDRABAD</li>
//           <li className="cursor-pointer">RANGAREDDY</li>
//           <li className="cursor-pointer">VIKARABAD</li>
//           <li className="cursor-pointer">MEDCHAL</li>
//           <li className="cursor-pointer">ADILABAD</li>

//           {/* Hover Dropdown */}
//           <li className="relative group cursor-pointer">
//             <span className="hover:text-orange-700">MORE</span>
//             <ul className="absolute left-0 mt-0 bg-black text-white rounded shadow-lg hidden group-hover:block min-w-max z-10">
//               {districts.map((dist, index) => (
//                 <li
//                   key={index}
//                   className="px-4 py-2 hover:bg-gray-800 cursor-pointer whitespace-nowrap"
//                 >
//                   {dist.toUpperCase()}
//                 </li>
//               ))}
//             </ul>
//           </li>

//           <li className="cursor-pointer">
//             <FiSearch size={18} />
//           </li>
//         </ul>
//       </nav>
//     </header>
//   )
// }

// export default Header;
