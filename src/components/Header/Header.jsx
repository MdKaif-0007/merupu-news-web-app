import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiLogoPlayStore } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const location = useLocation();
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsMobileDropdownOpen(false);
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
  const isCategoryActive = (name) =>
    location.pathname.toLowerCase().includes(`/news/category/${name}`);

  const isNewsDetailsPage = () => {
    const newsDetailsPattern = /^\/api\/news\/[a-zA-Z0-9]{20,}$/;
    return newsDetailsPattern.test(location.pathname);
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-[#b6261b] text-[#ffffff] text-sm px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-3 text-[#ffffff] text-lg">
          {isNewsDetailsPage() ? (
            <Link to="/" className="text-white hover:text-yellow-300">
              <IoMdHome size={24} />
            </Link>
          ) : (
            <>
              <a
                href="https://x.com/merupulu?lang=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter
                  size={20}
                  className="text-[#ffffff] cursor-pointer hover:scale-95"
                />
              </a>
              <a
                href="https://www.youtube.com/@merupulu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube
                  size={20}
                  className="text-[#ffffff] cursor-pointer hover:scale-95"
                />
              </a>
            </>
          )}
        </div>

        <div className="font-semibold">{today}</div>

        <a
          href="https://play.google.com/store/apps/details?id=com.androtech.merupunews.prod"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-yellow-400 hover:bg-yellow-300 rounded-full px-3 py-1 gap-1 cursor-pointer text-black flex items-center">
            <BiLogoPlayStore />
            <p className=" font-semibold text-xs">Download our app</p>
          </div>
        </a>
      </div>

      {/* Logo */}
      <div className="flex flex-col text-center pt-2 pb-4">
        <h1 className="text-6xl font-ramabhadra text-[#b6261b] py-3">
          మెరుపు న్యూస్​
        </h1>
        <p className="text-xs font-bold text-[#b6261b]">Merupu News</p>
      </div>

      {/* Navbar */}
      {!isNewsDetailsPage() && (
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

            {/* <Link
              to="/news/category/andhra-pradesh"
              className={`cursor-pointer hover:text-[#b6261b] ${
                isCategoryActive("andhra-pradesh")
                  ? "underline underline-offset-8 decoration-2 text-[#b6261b]"
                  : ""
              }`}
            >
              ANDHRA PRADESH
            </Link> */}

            {isMobileView ? (
              <Link
                to="/news/category/andhra-pradesh"
                className={`cursor-pointer hover:text-[#b6261b] ${
                  isCategoryActive("andhra-pradesh")
                    ? "underline underline-offset-8 decoration-2 text-[#b6261b]"
                    : ""
                }`}
              >
                AP
              </Link>
            ) : (
              <Link
                to="/news/category/andhra-pradesh"
                className={`cursor-pointer hover:text-[#b6261b] ${
                  isCategoryActive("andhra-pradesh")
                    ? "underline underline-offset-8 decoration-2 text-[#b6261b]"
                    : ""
                }`}
              >
                ANDHRA PRADESH
              </Link>
            )}

            <Link
              to="/news/category/national"
              className={`cursor-pointer hover:text-[#b6261b] ${
                isCategoryActive("national")
                  ? "underline underline-offset-8 decoration-2 text-[#b6261b]"
                  : ""
              }`}
            >
              NATIONAL
            </Link>

            {/* MORE Dropdown */}
            <div
              className={`relative group cursor-pointer ${
                isMobileView ? "" : "hover-trigger"
              }`}
              onClick={() =>
                isMobileView && setIsMobileDropdownOpen(!isMobileDropdownOpen)
              }
            >
              <div>
                <RxHamburgerMenu size={20} />
              </div>

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
                {allDistricts.map((dist, index) => (
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
      )}
    </header>
  );
};

export default Header;

{
  /* <div className="flex items-center">
                <span className="hover:text-[#b6261b]">MORE</span>
                <MdKeyboardArrowDown size={20} />
              </div> */
}
