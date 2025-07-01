import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NewsSection from "../NewsSection/NewsSection";
import GoogleAd from "../GoogleAd/GoogleAd";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-10 py-6 gap-4">
      {/* Left Ad Box - Sticky on large screens */}
      <aside className="hidden w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] rounded  md:flex justify-center lg:sticky lg:top-4">
        <GoogleAd />
      </aside>

      {/* Main News Content - Remains scrollable */}
      <main className="w-full lg:flex-1 space-y-8">
        <NewsSection category="latest-news" />
        {/* Add more NewsSection components if needed */}
      </main>

      {/* Right Ad Box - Sticky on large screens */}
      <aside className="hidden w-full lg:w-1/5 bg-transparent h-40 lg:h-[800px] rounded  md:flex justify-center lg:sticky lg:top-4">
        <GoogleAd />
      </aside>
    </div>
  );
};

export default Home;
