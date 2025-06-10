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

{
  /* Main Content */
}
{
  /* <main className="w-full lg:flex-1 space-y-8 bg-black text-white p-4 rounded">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col md:flex-row gap-4">
            <img
              src={article.image}
              alt="News"
              className="w-full md:w-1/2 h-auto rounded object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold leading-snug text-gray-400 hover:text-orange-700 cursor-pointer">
                {article.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {article.author} - {article.date}
              </p>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <button 
                onClick={() => navigate(`/news/${article.id}`, { state: { article } })}
              className="bg-orange-700 hover:bg-orange-600 text-white px-4 py-2 text-sm font-semibold rounded">
                Read more
              </button>
            </div>
          </div>
        ))}
      </main> */
}
