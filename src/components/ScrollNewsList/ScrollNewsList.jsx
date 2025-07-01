import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ScrollNewsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const page = 1;

  const fetchNews = async () => {
    try {
      const endpoint = `https://merupu-news.onrender.com/api/news/isBreaking?page=${page}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(result.docs || []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleClick = (article) => {
    navigate(`/api/news/${article._id}`, { state: { article } });
  };

  return (
    <div className="w-full px-6 pt-6 pb-4 rounded-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent News</h2>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : data.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <div
              key={item._id}
              onClick={() => handleClick(item)}
              className="overflow-hidden cursor-pointer border-b-[1px] border-gray-300 "
            >
              <div className="p-4 hover:scale-102 transition-transform duration-200">
                <h3 className="text-lg text-blue-600 hover:text-[#b61b1bf9] font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 font-semibold">
                  <span className="text-gray-800">{item.author}</span> •{" "}
                  {new Date(item.publishedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No news found.</p>
      )}
    </div>
  );
};

export default ScrollNewsList;
