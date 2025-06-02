import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsSection from '../NewsSection/NewsSection';
import NewsDetail from '../NewsDetails/NewsDetails';
import AllNews from '../AllNews/AllNews';

const Home = () => {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-10 py-6 gap-4">
      {/* Left Ad Box */}
      <aside className="w-full lg:w-1/5 bg-gray-100 h-40 lg:h-[600px] rounded shadow-md flex items-center justify-center">
        <span className="text-gray-500">AdSense Left</span>
      </aside>

       {/* Main News Content */}
      <main className="w-full lg:flex-1 space-y-8">
        <NewsSection category="breaking-news" />
        {/* Add more NewsSection components if you want to show other categories */}
      </main>

      {/* Right Ad Box */}
      <aside className="w-full lg:w-1/5 bg-gray-100 h-40 lg:h-[600px] rounded shadow-md flex items-center justify-center">
        <span className="text-gray-500">AdSense Right</span>
      </aside>
    </div>
  );
};

export default Home;









   {/* Main Content */}
      {/* <main className="w-full lg:flex-1 space-y-8 bg-black text-white p-4 rounded">
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
      </main> */}